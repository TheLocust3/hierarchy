import React from 'react';
import uuid from 'uuid/v4';

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

  render() {
    return <LeafComponent data={this.data} key={uuid()} />;
  }
}
