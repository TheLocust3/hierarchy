import React from 'react';

import TreeComponent from './TreeComponent';
import { Viewport } from '../../containers/TreeView';

export interface IData {
  title: string;
  body: string;
}

export interface ITree {
  data: IData;
  render: (parentX: number, parentY: number, viewport: Viewport) => JSX.Element;
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

  render(parentX: number, parentY: number, viewport: Viewport) {
    return (
      <TreeComponent
        data={this.data}
        nodes={this.nodes}
        parentX={parentX}
        parentY={parentY}
        viewport={viewport}
      />
    );
  }
}
