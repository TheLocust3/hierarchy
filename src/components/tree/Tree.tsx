import React from 'react';

import TreeComponent from './TreeComponent';

export interface IData {
  title: string;
  body: string;
}

export interface ITree {
  data: IData;
  render: (parentX: number, parentY: number) => JSX.Element;
}

export default class Tree implements ITree {
  private _nodes: ReadonlyArray<ITree> = [];
  private _data: IData = { title: '', body: '' };

  constructor(data: IData, nodes: ReadonlyArray<ITree>) {
    this._data = data;
    this._nodes = nodes;
  }

  get nodes() {
    return this._nodes;
  }

  get data() {
    return this._data;
  }

  render(parentX: number, parentY: number) {
    return (
      <TreeComponent data={this.data} nodes={this.nodes} parentX={parentX} parentY={parentY} />
    );
  }
}
