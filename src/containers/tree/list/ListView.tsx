import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { TITLE } from '../../../constants';
import { Dispatch, RouterMatch, RouterParams, AppState } from '../../../types';
import { getCardsRootedAt, addLabel, setStatus } from '../../../actions/list-actions';
import {
  getAllTrees,
  setOverlay,
  updateNode,
  deleteNode,
  deleteRelationship
} from '../../../actions/tree-actions';
import { Data, Node } from '../../../models/tree/tree-base';
import { TreeOverlay } from '../../../reducers/tree-reducer';

import Column from '../../../models/card/column';
import ListColumn from '../../../components/tree/list/ListColumn';

const ColumnContainer = styled('div')`
  display: flex;
  flex-direction: flex-direction;
  flex-wrap: nowrap;
`;

interface ListViewParams extends RouterParams {
  id: string;
}

interface ListViewProps {
  isReady: boolean;
  list: ReadonlyArray<Column>;
  areTreesReady: boolean;
  allLabels: ReadonlyArray<Node>;
  allStatuses: ReadonlyArray<Node>;
  overlay: TreeOverlay;
  dispatch: Dispatch;
  match: RouterMatch<ListViewParams>;
}

class ListView extends React.Component<ListViewProps> {
  componentDidMount() {
    this.props.dispatch(getCardsRootedAt(this.props.match.params.id));
    this.props.dispatch(getAllTrees());
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE} - List View</title>
          <meta name="description" content="Index" />
        </Helmet>

        {this.renderInner()}
      </div>
    );
  }

  private renderInner() {
    const { isReady, list, areTreesReady, allLabels, allStatuses, overlay } = this.props;

    if (!isReady || !areTreesReady) return;

    return (
      <div>
        <h1>List View</h1>

        <ColumnContainer>
          {list.map((column) => (
            <div key={column.id}>
              <ListColumn
                column={column}
                allLabels={allLabels.map((node) => {
                  return { id: node.id, title: node.data.title, createdAt: node.createdAt };
                })}
                allStatuses={allStatuses.map((node) => {
                  return { id: node.id, title: node.data.title, createdAt: node.createdAt };
                })}
                overlay={overlay}
                setOverlay={(overlay: TreeOverlay) => this.props.dispatch(setOverlay(overlay))}
                updateNode={(id: string, data: Data) => this.props.dispatch(updateNode(id, data))}
                deleteNode={(id: string) => this.props.dispatch(deleteNode(id))}
                createRelationship={(parentId: string, childId: string) => {
                  const label = allLabels.find((label) => label.id === parentId);
                  const status = allStatuses.find((status) => status.id === parentId);

                  if (label !== undefined) {
                    this.props.dispatch(
                      addLabel(
                        { id: label.id, title: label.data.title, createdAt: label.createdAt },
                        childId
                      )
                    );
                  } else if (status !== undefined) {
                    this.props.dispatch(
                      setStatus(
                        { id: status.id, title: status.data.title, createdAt: status.createdAt },
                        childId
                      )
                    );
                  }
                }}
                deleteRelationship={(parentId: string, childId: string) =>
                  this.props.dispatch(deleteRelationship(parentId, childId))
                }
              />
            </div>
          ))}
        </ColumnContainer>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  list: state.list.list,
  isReady: state.list.isReady,
  areTreesReady: state.tree.isReady,
  allLabels: state.tree.labels,
  allStatuses: state.tree.statuses,
  overlay: state.tree.overlay
});

export default connect(mapStateToProps)(ListView);
