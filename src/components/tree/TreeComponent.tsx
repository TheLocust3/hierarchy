import React from 'react';
import styled from '@emotion/styled';

import { IData, ITree } from './Tree';
import NodeComponent from './NodeComponent';

const TreeContainer = styled('div')`
  position: relative;
  width: 100%;
`;

const Nodes = styled('div')`
  display: flex;
`;

interface TreeProps {
  data: IData;
  nodes: ReadonlyArray<ITree>;
}

class TreeComponent extends React.Component<TreeProps, {}> {
  render() {
    const { data, nodes, ...props } = this.props;

    return (
      <TreeContainer {...props}>
        <NodeComponent data={data} />

        <Nodes>
          {nodes.map((node) => {
            return node.render();
          })}
        </Nodes>
      </TreeContainer>
    );
  }
}

export default TreeComponent;
