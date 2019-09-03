import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState, Dispatch } from '../../types';
import { ITree } from '../../models/tree/tree-base';
import { getAllTrees, createRootLeaf } from '../../actions/tree-actions';

import FloatingActionButton from '../../components/common/FloatingActionButton';
import { colors } from '../../constants';

interface RootTreeViewProps {
  trees: ReadonlyArray<ITree>;
  isReady: boolean;
  dispatch: Dispatch;
}

class RootTreeView extends React.Component<RootTreeViewProps> {
  componentDidMount() {
    this.props.dispatch(getAllTrees());
  }

  renderRootTrees() {
    if (!this.props.isReady) return;

    return (
      <div>
        {this.props.trees.map((tree, i) => {
          return (
            <div key={i}>
              <Link to={`/tree/${tree.id}`}>{tree.data.title}</Link>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>All Trees</title>
          <meta name="description" content="All trees" />
        </Helmet>

        <div>
          <h1>All Trees</h1>
          <br />

          {this.renderRootTrees()}
        </div>

        <FloatingActionButton
          icon="add"
          backgroundColor={colors.addGreen}
          backgroundColorHover={colors.addGreenHover}
          color="white"
          onClick={() => {
            this.props.dispatch(createRootLeaf());

            window.location.reload();
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  trees: state.tree.trees,
  isReady: state.tree.isReady
});

export default connect(mapStateToProps)(RootTreeView);
