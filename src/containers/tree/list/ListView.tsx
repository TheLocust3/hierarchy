import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { TITLE } from '../../../constants';
import { Dispatch, RouterMatch, RouterParams, AppState } from '../../../types';
import { getCardsRootedAt } from '../../../actions/list-actions';
import { getAllLabelTrees } from '../../../actions/tree-actions';
import Column from '../../../models/card/column';
import ListColumn from '../../../components/tree/list/ListColumn';
import { ITree } from '../../../models/tree/tree-base';

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
    const { isReady, list, areTreesReady, specialTrees } = this.props;

    if (!isReady || !areTreesReady) return;

    return (
      <div>
        <h1>List View</h1>

        <ColumnContainer>
          {list.map((column) => (
            <div key={column.id}>
              <ListColumn column={column} specialTrees={specialTrees} />
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
  areTreesReady: state.tree.isReady
});

export default connect(mapStateToProps)(ListView);
