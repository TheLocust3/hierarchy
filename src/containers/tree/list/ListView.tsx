import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../../../constants';
import { Dispatch, RouterMatch, RouterParams, AppState } from '../../../types';
import { getCardsRootedAt } from '../../../actions/list-actions';
import Column from '../../../models/card/column';

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

        <div>
          <h1>List View</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  list: state.list.list,
  isReady: state.list.isReady
});

export default connect(mapStateToProps)(ListView);
