import React from 'react';

import { Data } from '../../models/tree/tree-base';
import Viewport from '../../models/viewport';
import NodeComponent from './NodeComponent';
import NodeOverlay from './NodeOverlay';
import { TreeOverlay } from '../../reducers/tree-reducer';

interface LeafProps {
  uuid: string;
  data: Data;
  overlay: TreeOverlay;
  parentX: number;
  parentY: number;
  viewport: Viewport;
  setOverlay: (overlay: TreeOverlay) => void
}

class LeafComponent extends React.Component<LeafProps> {

  componentDidMount() {
    window.addEventListener('click', () => { // TOOD: bind this only when uuid is selected
      if (this.props.overlay.uuid === this.props.uuid && this.props.overlay.open) {
        this.props.setOverlay({ uuid: this.props.uuid, open: false })
      }
    });
  }

  render() {
    const { uuid, data, overlay, parentX, parentY, viewport } = this.props;

    return (
      <div>
        <NodeComponent
          uuid={uuid}
          data={data}
          parentX={parentX}
          parentY={parentY}
          viewport={viewport}
          overlay={overlay}
          onClick={(event) => {
            if (!overlay.open) {
              this.props.setOverlay({ uuid: uuid, open: true })
              event.stopPropagation()
            }
          }}
        />

        <NodeOverlay
          uuid={uuid}
          data={data}
          currentOverlay={overlay}
        />
      </div>
    );
  }
}

export default LeafComponent;
