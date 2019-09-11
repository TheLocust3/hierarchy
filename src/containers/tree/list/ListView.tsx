import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { TITLE } from '../../../constants';
import { Dispatch, RouterMatch, RouterParams, AppState } from '../../../types';
import { getCardsRootedAt } from '../../../actions/list-actions';
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
  dispatch: Dispatch;
  match: RouterMatch<ListViewParams>;
}

class ListView extends React.Component<ListViewProps> {
  componentDidMount() {
    this.props.dispatch(getCardsRootedAt(this.props.match.params.id));
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
    const { isReady, list } = this.props;

    if (!isReady) return;

    return (
      <div>
        <h1>List View</h1>

        <ColumnContainer>
          {list.map((column) => (
            <span key={column.id}>
              <ListColumn column={column} />
            </span>
          ))}
        </ColumnContainer>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  list: state.list.list,
  isReady: state.list.isReady
});

export default connect(mapStateToProps)(ListView);
