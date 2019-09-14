import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { AppState, Dispatch } from '../../types';
import { Node } from '../../models/tree/tree-base';
import { getAllTrees, createRootLeaf } from '../../actions/tree-actions';

import AddButton from '../../components/tree/AddButton';

const ListContainer = styled('div')`
  margin-top: 0.5%;
  margin-left: 1%;
`;

const TreeList = styled('div')`
  margin-top: 1%;
  margin-left: 1.5%;
`;

const TreeListHeader = styled('div')`
  width: 110px;
  position: relative;
`;

const AddButtonContainer = styled('div')`
  position: absolute;
  top: -1px;
  right: 0;
`;

interface RootTreeViewProps {
  trees: ReadonlyArray<Node>;
  isReady: boolean;
  dispatch: Dispatch;
}

class RootTreeView extends React.Component<RootTreeViewProps> {
  componentDidMount() {
    this.props.dispatch(getAllTrees());
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
      </div>
    );
  }

  private renderRootTrees() {
    if (!this.props.isReady) return;

    return (
      <ListContainer>
        <TreeListHeader>
          Status Trees
          <AddButtonContainer>
            <AddButton
              onClick={() => {
                this.props.dispatch(createRootLeaf('status'));
                window.location.reload();
              }}
            />
          </AddButtonContainer>
        </TreeListHeader>

        {this.renderTreeList(this.props.trees.filter((tree) => tree.data.type === 'status'))}
        <br />
        <br />

        <TreeListHeader>
          Label Trees
          <AddButtonContainer>
            <AddButton
              onClick={() => {
                this.props.dispatch(createRootLeaf('label'));
                window.location.reload();
              }}
            />
          </AddButtonContainer>
        </TreeListHeader>

        {this.renderTreeList(this.props.trees.filter((tree) => tree.data.type === 'label'))}
        <br />
        <br />

        <TreeListHeader>
          Task Trees
          <AddButtonContainer>
            <AddButton
              onClick={() => {
                this.props.dispatch(createRootLeaf('card'));
                window.location.reload();
              }}
            />
          </AddButtonContainer>
        </TreeListHeader>

        {this.renderTreeList(this.props.trees.filter((tree) => tree.data.type === 'card'))}
      </ListContainer>
    );
  }

  private renderTreeList(trees: ReadonlyArray<Node>) {
    if (trees.length === 0) return <TreeList>None</TreeList>;

    return (
      <TreeList>
        {trees.map((tree, i) => {
          return (
            <div key={i}>
              <Link to={`/tree/${tree.id}`}>{tree.data.title}</Link>
            </div>
          );
        })}
      </TreeList>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  trees: state.tree.nodes,
  isReady: state.tree.isReady
});

export default connect(mapStateToProps)(RootTreeView);
