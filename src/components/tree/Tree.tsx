import React from 'react';

import { Data, ITree, Viewport } from './tree-types';
import TreeComponent from './TreeComponent';
import { TreeJSON } from '../../api/tree-api';
import Leaf from './Leaf';

export default class Tree implements ITree {
  private _uuid: String = '';
  private _nodes: ReadonlyArray<ITree> = [];
  private _data: Data = { title: '', body: '' };

  static fromJSON(json: TreeJSON): ITree {
    if (json.type === 'tree' && json.nodes != null) {
      return new Tree(
        json.uuid,
        Data.fromJSON(json.data),
        json.nodes.map((node) => this.fromJSON(node))
      );
    } else {
      return new Leaf(json.uuid, Data.fromJSON(json.data));
    }
  }

  constructor(uuid: String, data: Data, nodes: ReadonlyArray<ITree>) {
    this._uuid = uuid;
    this._data = data;
    this._nodes = nodes;
  }

  get uuid() {
    return this._uuid;
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
