import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { IData } from './Tree';

const NodeContainer = styled('div')`
  margin: 20px;
  text-align: center;
`;

const NodeInner = styled('div')`
  display: inline-block;
  width: 100px;
  height: 100px;

  border: 1px solid ${colors.black};
  border-radius: 10px;
`;

interface LeafProps {
  data: IData;
}

class NodeComponent extends React.Component<LeafProps, {}> {
  render() {
    const { data, ...props } = this.props;

    return (
      <NodeContainer {...props}>
        <NodeInner>
          <h3>{data.title}</h3>

          <p>{data.body}</p>
        </NodeInner>
      </NodeContainer>
    );
  }
}

export default NodeComponent;
