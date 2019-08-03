import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { colors, TITLE } from '../constants';
import { AppState, Dispatch, RouterMatch, RouterParams } from '../types';

import { ITree } from '../models/tree/tree-base';
import Viewport from '../models/viewport';
import TreeComponent from '../components/tree/TreeComponent';
import { getTree } from '../actions/tree-actions';

const TreeViewport = styled('div')`
  position: relative;

  border: 1px ${colors.black} solid;
  border-radius: 5px;

  padding: 1%;
  margin: 1%;

  width: 96%;
  height: 88vh;

  overflow: scroll;

  text-align: center;
`;

interface TreeViewParams extends RouterParams {
  uuid: string;
}

interface TreeViewProps {
  tree: ITree;
  isReady: boolean;
  dispatch: Dispatch;
  match: RouterMatch<TreeViewParams>
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

  componentWillMount() {
    this.props.dispatch(getTree(this.props.match.params.uuid));
  }

  componentDidMount() {
    this.updateViewport();

    window.addEventListener('resize', () => this.updateViewport());
  }

  render() {
    const title = this.props.tree.data.title

    return (
      <div>
        <Helmet>
          <title>{TITLE} - {title} Tree</title>
          <meta name="description" content="Tree View" />
        </Helmet>

        <div>
          <h1>{title} Tree</h1>

          <TreeViewport ref={this.viewportRef}>
            <TreeComponent
              uuid={this.props.tree.uuid}
              viewport={this.state.viewport}
              data={this.props.tree.data}
              nodes={this.props.tree.nodes}
            />
          </TreeViewport>
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
  isReady: state.tree.isReady
});

export default connect(mapStateToProps)(TreeView);
