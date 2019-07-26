import React from 'react';
import styled from '@emotion/styled';

import { IData, ITree } from './Tree';

const TreeContainer = styled('div')`
  margin-left: 2.5%;
`;

interface TreeProps {
  data: IData;
  nodes: ReadonlyArray<ITree>;
}

class TreeComponent extends React.Component<TreeProps, {}> {
  render() {
    let { data, nodes, ...props } = this.props;

    return (
      <TreeContainer {...props}>
        <i>{data.data}</i>
        <br />

        <b>Nodes:</b>
        <br />
        {nodes.map((node) => {
          return node.render();
        })}
      </TreeContainer>
    );
  }
}

export default TreeComponent;
