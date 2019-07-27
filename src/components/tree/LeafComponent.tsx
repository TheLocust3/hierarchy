import React from 'react';
import styled from '@emotion/styled';

import { IData } from './Tree';
import NodeComponent from './NodeComponent';

const LeafContainer = styled('div')`
  position: relative;
  width: 100%;
`;

interface LeafProps {
  data: IData;
}

class LeafComponent extends React.Component<LeafProps, {}> {
  render() {
    const { data, ...props } = this.props;

    return (
      <LeafContainer {...props}>
        <NodeComponent data={data} />
      </LeafContainer>
    );
  }
}

export default LeafComponent;
