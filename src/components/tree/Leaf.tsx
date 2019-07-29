import React from 'react';

import { Data, ITree, Viewport } from './tree-types';
import LeafComponent from './LeafComponent';

export default class Leaf implements ITree {
  private _uuid: String = '';
  private _data: Data = { title: '', body: '' };
  private _nodes: ReadonlyArray<ITree> = [];

  constructor(uuid: String, data: Data) {
    this._uuid = uuid;
    this._data = data;
  }

  get uuid() {
    return this._uuid;
  }

  get data() {
    return this._data;
  }

  get nodes() {
    return this._nodes;
  }

  render(parentX: number, parentY: number, viewport: Viewport) {
    return (
      <LeafComponent data={this.data} parentX={parentX} parentY={parentY} viewport={viewport} />
    );
  }
}
