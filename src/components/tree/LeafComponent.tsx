import React from 'react';

import { Data } from '../../models/tree/tree-base';
import { history } from '../../constants';
import Viewport from '../../models/viewport';
import NodeComponent from './NodeComponent';

interface LeafProps {
  uuid: string;
  data: Data;
  parentX: number;
  parentY: number;
  viewport: Viewport;
}

class LeafComponent extends React.Component<LeafProps, {}> {
  render() {
    const { uuid, data, parentX, parentY, viewport } = this.props;

    return (
      <div>
        <NodeComponent
          uuid={uuid}
          data={data}
          parentX={parentX}
          parentY={parentY}
          viewport={viewport}
          onClick={() => history.push(`/tree/${uuid}`)}
        />
      </div>
    );
  }
}

export default LeafComponent;
