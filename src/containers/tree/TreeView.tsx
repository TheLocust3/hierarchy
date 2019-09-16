import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { colors, TITLE } from '../../constants';
import { AppState, Dispatch, RouterMatch, RouterParams } from '../../types';

import { ITree, Data, Node } from '../../models/tree/tree-base';
import Viewport from '../../models/viewport';
import TreeComponent from '../../components/tree/TreeComponent';
import {
  getTree,
  getAllTrees,
  setOverlay,
  updateNode,
  deleteNode,
  createLeaf,
  createRelationship,
  deleteRelationship
} from '../../actions/tree-actions';
import { TreeOverlay } from '../../reducers/tree-reducer';

const TreeViewport = styled('div')`
  position: relative;

  border: 1px ${colors.black} solid;
  border-radius: 5px;

  padding: 1%;
  margin: 1%;

  width: 96%;
  height: 85vh;

  overflow: scroll;

  text-align: center;
`;

interface TreeViewParams extends RouterParams {
  id: string;
}

interface TreeViewProps {
  tree: ITree;
  labels: ReadonlyArray<Node>;
  statuses: ReadonlyArray<Node>;
  isReady: boolean;
  overlay: TreeOverlay;
  dispatch: Dispatch;
  match: RouterMatch<TreeViewParams>;
}

interface TreeViewState {
  viewport: Viewport;
}

class TreeView extends React.Component<TreeViewProps, TreeViewState> {
  viewportRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: TreeViewProps) {
    super(props);

    this.state = { viewport: { width: 0, height: 0, x: 0, y: 0 } };
  }

  componentDidMount() {
    this.props.dispatch(getTree(this.props.match.params.id));
    this.props.dispatch(getAllTrees());

    window.addEventListener('resize', () => this.updateViewport());
  }

  componentDidUpdate() {
    this.updateViewport();
  }

  renderTree() {
    if (!this.props.isReady) return;

    if (this.props.tree.isEmpty()) {
      window.location.href = '/tree';
    }

    return (
      <TreeViewport ref={this.viewportRef}>
        <TreeComponent
          tree={this.props.tree}
          allLabels={this.props.labels.map((label) => {
            return { id: label.id, title: label.data.title, createdAt: label.createdAt };
          })}
          allStatuses={this.props.statuses.map((status) => {
            return { id: status.id, title: status.data.title, createdAt: status.createdAt };
          })}
          viewport={this.state.viewport}
          overlay={this.props.overlay}
          setOverlay={(overlay: TreeOverlay) => this.props.dispatch(setOverlay(overlay))}
          updateNode={(id: string, data: Data) => this.props.dispatch(updateNode(id, data))}
          deleteNode={(id: string) => this.props.dispatch(deleteNode(id))}
          createLeaf={(id: string) => this.props.dispatch(createLeaf(id))}
          createRelationship={(parentId: string, childId: string) =>
            this.props.dispatch(createRelationship(parentId, childId))
          }
          deleteRelationship={(parentId: string, childId: string) =>
            this.props.dispatch(deleteRelationship(parentId, childId))
          }
        />
      </TreeViewport>
    );
  }

  render() {
    const title = this.props.tree.data.title;

    return (
      <div>
        <Helmet>
          <title>
            {TITLE} - {title} Tree
          </title>
          <meta name="description" content="Tree View" />
        </Helmet>

        <div>
          <h1>{title} Tree</h1>

          {this.renderTree()}
        </div>
      </div>
    );
  }

  updateViewport() {
    if (this.viewportRef.current === null) return;

    const rect = this.viewportRef.current.getBoundingClientRect();
    const newViewport: Viewport = {
      width: this.viewportRef.current.scrollWidth,
      height: this.viewportRef.current.scrollHeight,
      x: rect.left - this.viewportRef.current.scrollLeft,
      y: rect.top - this.viewportRef.current.scrollTop
    };

    if (!_.isEqual(newViewport, this.state.viewport)) {
      this.setState({
        viewport: newViewport
      });
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  tree: state.tree.tree,
  labels: state.tree.labels,
  statuses: state.tree.statuses,
  isReady: state.tree.isReady,
  overlay: state.tree.overlay
});

export default connect(mapStateToProps)(TreeView);
