import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { AppState, Dispatch } from '../../types';
import { Node } from '../../models/tree/tree-base';
import { getAllTrees } from '../../actions/tree-actions';

import RootNode from '../../components/tree/RootNode';

interface CalendarListViewProps {
  trees: ReadonlyArray<Node>;
  labels: ReadonlyArray<Node>;
  statuses: ReadonlyArray<Node>;
  isReady: boolean;
  dispatch: Dispatch;
}

class CalendarListView extends React.Component<CalendarListViewProps> {
  componentDidMount() {
    this.props.dispatch(getAllTrees());
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>All Calendars</title>
          <meta name="description" content="All Calendars" />
        </Helmet>
        <div>
          <h1>All Calendars</h1>
          <br />

          {this.props.trees
            .filter((tree) => tree.data.type === 'card')
            .map((tree) => (
              <span key={tree.id}>
                <RootNode node={tree} to={`/calendar/${tree.id}`} />
              </span>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  trees: state.tree.nodes,
  isReady: state.tree.isReady
});

export default connect(mapStateToProps)(CalendarListView);
