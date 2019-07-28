import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { colors, TITLE } from '../constants';

import TreeComponent from '../components/tree/TreeComponent';
import Tree from '../components/tree/Tree';
import Leaf from '../components/tree/Leaf';

export interface Viewport {
  width: number;
  height: number;
  x: number;
  y: number;
}

const TreeViewport = styled('div')`
  position: relative;

  border: 1px ${colors.black} solid;
  border-radius: 5px;

  padding: 1%;
  margin: 1%;

  width: 96%;
  height: 91vh;

  overflow: scroll;

  text-align: center;
`;

interface TreeViewState {
  viewport: Viewport;
}

class TreeView extends React.Component<{}, TreeViewState> {
  viewportRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: {}) {
    super(props);

    this.state = { viewport: { width: 0, height: 0, x: 0, y: 0 } };
  }

  componentDidMount() {
    this.updateViewport();

    window.addEventListener('resize', () => this.updateViewport());
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE} - Tree View</title>
          <meta name="description" content="Tree View" />
        </Helmet>

        <div>
          <h1>Tree View</h1>

          <TreeViewport ref={this.viewportRef}>
            <TreeComponent
              viewport={this.state.viewport}
              data={{ title: 'root', body: 'body' }}
              nodes={[
                new Tree({ title: 'tree 1', body: 'body' }, [
                  new Leaf({ title: 'leaf 1', body: 'body' }),
                  new Leaf({ title: 'leaf 2', body: 'body' })
                ]),
                new Tree({ title: 'tree 2', body: 'body' }, [
                  new Tree({ title: 'tree 4', body: 'body' }, [
                    new Leaf({ title: 'leaf 5', body: 'body' })
                  ]),
                  new Leaf({ title: 'leaf 3', body: 'body' }),
                  new Leaf({ title: 'leaf 4', body: 'body' }),
                  new Tree({ title: 'tree 6', body: 'body' }, [
                    new Leaf({ title: 'leaf 6', body: 'body' }),
                    new Leaf({ title: 'leaf 7', body: 'body' }),
                    new Leaf({ title: 'leaf 7', body: 'body' }),
                    new Leaf({ title: 'leaf 7', body: 'body' }),
                    new Leaf({ title: 'leaf 7', body: 'body' }),
                    new Leaf({ title: 'leaf 7', body: 'body' })
                  ])
                ]),
                new Tree({ title: 'tree 6', body: 'body' }, [
                  new Leaf({ title: 'leaf 6', body: 'body' }),
                  new Leaf({ title: 'leaf 6', body: 'body' }),
                  new Leaf({ title: 'leaf 6', body: 'body' })
                ])
              ]}
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

    if (
      newViewport.height !== this.state.viewport.height ||
      newViewport.width !== this.state.viewport.width ||
      newViewport.x !== this.state.viewport.x ||
      newViewport.y !== this.state.viewport.y
    ) {
      this.setState({
        viewport: newViewport
      });
    }
  }
}

export default connect()(TreeView);
