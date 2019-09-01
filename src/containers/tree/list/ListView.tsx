import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../../../constants';
import { Dispatch, RouterMatch, RouterParams, AppState } from '../../../types';
import { getTreeAsList } from '../../../actions/tree-actions';
import Leaf from '../../../models/tree/leaf';

interface ListViewParams extends RouterParams {
  id: string;
}

interface ListViewProps {
  isReady: boolean;
  nodes: ReadonlyArray<Leaf>;
  dispatch: Dispatch;
  match: RouterMatch<ListViewParams>;
}

class ListView extends React.Component<ListViewProps> {
  componentDidMount() {
    this.props.dispatch(getTreeAsList(this.props.match.params.id));
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
  nodes: state.tree.nodes,
  isReady: state.tree.isReady
});

export default connect(mapStateToProps)(ListView);
