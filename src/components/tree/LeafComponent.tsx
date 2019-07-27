import React from 'react';
import styled from '@emotion/styled';

import { IData } from './Tree';
import NodeComponent from './NodeComponent';

const LeafContainer = styled('div')`
  width: 100%;
`;

interface LeafProps {
  data: IData;
  parentX: number;
  parentY: number;
}

class LeafComponent extends React.Component<LeafProps, {}> {
  render() {
    const { data, parentX, parentY } = this.props;

    return (
      <LeafContainer>
        <NodeComponent data={data} parentX={parentX} parentY={parentY} getXY={(x, y) => {}} />
      </LeafContainer>
    );
  }
}

export default LeafComponent;
