import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { TITLE } from '../../../constants';
import { Dispatch, RouterMatch, RouterParams, AppState } from '../../../types';
import { getCardsRootedAt } from '../../../actions/list-actions';
import {
  getAllLabelTrees,
  setOverlay,
  updateNode,
  deleteNode,
  createRelationship,
  deleteRelationship
} from '../../../actions/tree-actions';
import { ITree, Data } from '../../../models/tree/tree-base';
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
  specialTrees: ReadonlyArray<ITree>;
  overlay: TreeOverlay;
  dispatch: Dispatch;
  match: RouterMatch<ListViewParams>;
}

class ListView extends React.Component<ListViewProps> {
  componentDidMount() {
    this.props.dispatch(getCardsRootedAt(this.props.match.params.id));
    this.props.dispatch(getAllLabelTrees());
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
    const { isReady, list, areTreesReady, specialTrees, overlay } = this.props;

    if (!isReady || !areTreesReady) return;

    return (
      <div>
        <h1>List View</h1>

        <ColumnContainer>
          {list.map((column) => (
            <div key={column.id}>
              <ListColumn
                column={column}
                specialTrees={specialTrees}
                overlay={overlay}
                setOverlay={(overlay: TreeOverlay) => this.props.dispatch(setOverlay(overlay))}
                updateNode={(id: string, data: Data) => this.props.dispatch(updateNode(id, data))}
                deleteNode={(id: string) => this.props.dispatch(deleteNode(id))}
                createRelationship={(parentId: string, childId: string) =>
                  this.props.dispatch(createRelationship(parentId, childId))
                }
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
  specialTrees: state.tree.specialTrees,
  areTreesReady: state.tree.isReady,
  overlay: state.tree.overlay
});

export default connect(mapStateToProps)(ListView);
