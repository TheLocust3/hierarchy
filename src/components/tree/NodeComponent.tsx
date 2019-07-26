import React from 'react';
import styled from '@emotion/styled';

import { IData } from './Tree';

const NodeContainer = styled('div')`
  margin-left: 2.5%;
`;

interface NodeProps {
  data: IData;
}

class NodeComponent extends React.Component<NodeProps, {}> {
  render() {
    let { data, ...props } = this.props;

    return (
      <NodeContainer {...props}>
        <i>{data.data}</i>
      </NodeContainer>
    );
  }
}

export default NodeComponent;
