import React from "react";
import styled from "@emotion/styled";

import { colors } from "../../constants";
import { ITree } from "../../models/tree/tree-base";
import Viewport from "../../models/viewport";

import LineTo from "../common/LineTo";
import NodeActions from "./NodeActions";
import { TreeOverlay } from "../../reducers/tree-reducer";

const NODE_WIDTH = 100;
const NODE_HEIGHT = 100;

const X_OFFSET = NODE_WIDTH / 2;
const Y_OFFSET = NODE_HEIGHT + 2; // adjusted for border

const NodeContainer = styled("div")`
  text-align: center;
  margin-bottom: 75px;
  min-width: 110px;
`;

interface NodeInnerProps {
  borderColor?: string;
}

const NodeInner = styled("div")<NodeInnerProps>`
  position: relative;
  cursor: pointer;

  display: inline-block;
  width: ${NODE_WIDTH}px;
  height: ${NODE_HEIGHT}px;

  border: 1px solid ${colors.black};
  border-radius: 10px;

  transition: border-color 250ms;

  &:hover {
    border-color: ${(props: NodeInnerProps) =>
      props.borderColor === undefined ? colors.black : props.borderColor};
  }

  &:hover span {
    -webkit-filter: brightness(95%);
  }
`;

const Body = styled("p")`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface BackgroundProps {
  backgroundColor?: string;
}

const Background = styled("span")<BackgroundProps>`
  position: absolute;
  top: -1px;
  left: -1px;

  width: ${NODE_WIDTH + 2}px;
  height: ${NODE_HEIGHT + 2}px;

  background-color: ${(props: BackgroundProps) =>
    props.backgroundColor === undefined ? colors.nodeBackground : props.backgroundColor};

  border-radius: 10px;
  overflow: hidden;

  filter: brightness(100%);
  -webkit-filter: brightness(100%);

  transition: background-color 0.25s, filter 0.25s;

  z-index: -1;
`;

interface NodeProps {
  tree: ITree;
  overlay: TreeOverlay;
  parentX?: number;
  parentY?: number;
  getXY?: (x: number, y: number) => void;
  viewport: Viewport;
  onClick: (event: any) => void;
  deleteNode: () => void;
  createLeaf: () => void;
}

interface NodeState {
  x: number;
  y: number;
}

class NodeComponent extends React.Component<NodeProps, NodeState> {
  headerRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: NodeProps) {
    super(props);

    this.state = { x: 0, y: 0 };
  }

  componentDidMount() {
    this.updateTextSize();
  }

  componentDidUpdate() {
    this.updateTextSize();
  }

  renderLine(viewport: Viewport, parentX?: number, parentY?: number) {
    if (parentX == null || parentY == null) return; // root tree doesn't have any parents and no line

    return (
      <LineTo
        fromX={parentX + X_OFFSET - viewport.x}
        fromY={parentY + Y_OFFSET - viewport.y - 1}
        toX={this.state.x + X_OFFSET - viewport.x}
        toY={this.state.y - viewport.y - 1}
        viewport={this.props.viewport}
      />
    );
  }

  render() {
    const {
      tree,
      parentX,
      parentY,
      viewport,
      onClick,
      overlay,
      deleteNode,
      createLeaf
    } = this.props;
    const getXY = this.props.getXY == null ? (x: number, y: number) => {} : this.props.getXY;
    const id = tree.id;
    const data = tree.data;

    const status = tree.findParentsByType("status").map((tree) => {
      return {
        id: tree.id,
        title: tree.data.title,
        createdAt: tree.createdAt,
        color: tree.color
      };
    })[0]; // TODO: catch errors on this bad boy

    return (
      <NodeContainer>
        {this.renderLine(viewport, parentX, parentY)}

        <NodeInner
          onClick={(event) => onClick(event)}
          ref={(e: HTMLDivElement) => {
            if (e !== null) {
              const rect = e.getBoundingClientRect();
              getXY(rect.left, rect.top);
              this.updateXYState(rect.left, rect.top);
            }
          }}
          borderColor={status === undefined ? undefined : status.color}>
          <Background backgroundColor={tree.color} />
          <NodeActions id={id} overlay={overlay} deleteNode={deleteNode} createLeaf={createLeaf} />
          <h3 ref={this.headerRef}>{data.title}</h3>

          <Body>{data.body}</Body>
        </NodeInner>
      </NodeContainer>
    );
  }

  updateXYState(x: number, y: number) {
    if (this.state.x !== x) {
      this.setState({
        x: x
      });
    }

    if (this.state.y !== y) {
      this.setState({
        y: y
      });
    }
  }

  updateTextSize() {
    if (this.headerRef.current === null) return;

    const header = this.headerRef.current;
    const computedStyle = window.getComputedStyle(header);
    if (computedStyle === null || computedStyle.fontSize === null) return;

    let fontSize = parseFloat(computedStyle.fontSize);

    // shrink if header is too wide or too tall
    while (header.scrollWidth > NODE_WIDTH || header.scrollHeight > NODE_HEIGHT / 1.75) {
      fontSize -= 1;
      header.style.fontSize = `${fontSize}px`;
    }
  }
}

export default NodeComponent;
