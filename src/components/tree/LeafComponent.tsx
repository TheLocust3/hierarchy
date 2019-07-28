import React from 'react';

import { IData } from './Tree';
import NodeComponent from './NodeComponent';
import { Viewport } from '../../containers/TreeView';

interface LeafProps {
  data: IData;
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
