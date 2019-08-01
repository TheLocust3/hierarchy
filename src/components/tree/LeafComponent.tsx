import React from 'react';

import { Data } from '../../models/tree/tree-base';
import Viewport from '../../models/viewport';
import NodeComponent from './NodeComponent';

interface LeafProps {
  data: Data;
  parentX: number;
  parentY: number;
  viewport: Viewport;
}

class LeafComponent extends React.Component<LeafProps, {}> {
  render() {
    const { data, parentX, parentY, viewport } = this.props;

    return (
      <div>
        <NodeComponent
          data={data}
          parentX={parentX}
          parentY={parentY}
          getXY={(x, y) => {}}
          viewport={viewport}
        />
      </div>
    );
  }
}

export default LeafComponent;
