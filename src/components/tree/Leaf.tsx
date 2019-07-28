import React from 'react';

import { IData, ITree } from './Tree';
import LeafComponent from './LeafComponent';
import { Viewport } from '../../containers/TreeView';

export default class Leaf implements ITree {
  _data: IData = { title: '', body: '' };

  constructor(data: IData) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  render(parentX: number, parentY: number, viewport: Viewport) {
    return (
      <LeafComponent data={this.data} parentX={parentX} parentY={parentY} viewport={viewport} />
    );
  }
}
