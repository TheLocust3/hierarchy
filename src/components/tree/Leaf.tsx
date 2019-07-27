import React from 'react';

import { IData, ITree } from './Tree';
import LeafComponent from './LeafComponent';

export default class Leaf implements ITree {
  _data: IData = { title: '', body: '' };

  constructor(data: IData) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  render(parentX: number, parentY: number) {
    return <LeafComponent data={this.data} parentX={parentX} parentY={parentY} />;
  }
}
