import React from 'react';
import uuid from 'uuid/v4';

import { IData, ITree } from './Tree';
import NodeComponent from './NodeComponent';

export default class Node implements ITree {
  _data: IData = { data: '' };

  constructor(data: IData) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  render() {
    return <NodeComponent data={this.data} key={uuid()} />;
  }
}
