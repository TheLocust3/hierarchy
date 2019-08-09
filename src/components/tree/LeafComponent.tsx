import React from 'react';

import { Data } from '../../models/tree/tree-base';
import Viewport from '../../models/viewport';
import NodeComponent from './NodeComponent';
import NodeOverlay from './overlay/NodeOverlay';
import { TreeOverlay } from '../../reducers/tree-reducer';

interface LeafProps {
  id: string;
  data: Data;
  overlay: TreeOverlay;
  parentX: number;
  parentY: number;
  viewport: Viewport;
  setOverlay: (overlay: TreeOverlay) => void
}

class LeafComponent extends React.Component<LeafProps> {

  componentDidMount() {
    window.addEventListener('click', () => { // TOOD: bind this only when id is selected
      if (this.props.overlay.id === this.props.id && this.props.overlay.open) {
        this.props.setOverlay({ id: this.props.id, open: false })
      }
    });
  }

  render() {
    const { id, data, overlay, parentX, parentY, viewport } = this.props;

    return (
      <div>
        <NodeComponent
          id={id}
          data={data}
          parentX={parentX}
          parentY={parentY}
          viewport={viewport}
          overlay={overlay}
          onClick={(event) => {
            if (!overlay.open) {
              this.props.setOverlay({ id: id, open: true })
              event.stopPropagation()
            }
          }}
        />

        <NodeOverlay
          id={id}
          data={data}
          currentOverlay={overlay}
        />
      </div>
    );
  }
}

export default LeafComponent;
