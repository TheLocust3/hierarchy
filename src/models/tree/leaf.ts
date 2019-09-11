import moment from 'moment';

import { Data, ITree } from './tree-base';
import Tree from './tree';
import { TreeJSON } from '../json/tree-json';

export default class Leaf implements ITree {
  private _id: string = '';
  private _data: Data = Data.empty();
  private _nodes: ReadonlyArray<ITree> = [];
  private _createdAt: number = moment().valueOf();

  static fromJSON(json: TreeJSON) {
    return new Leaf(json.id, Data.fromJSON(json.data), json.createdAt);
  }

  constructor(id: string, data: Data, createdAt: number) {
    this._id = id;
    this._data = data;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  get data() {
    return this._data;
  }

  get nodes() {
    return this._nodes;
  }

  get createdAt() {
    return this._createdAt;
  }

  isEmpty() {
    return false;
  }

  containsITree(id: string) {
    return this.id === id;
  }

  getNodeById(id: string): ITree | undefined {
    if (this.id === id) return this;

    return undefined;
  }

  insertNodeByParentId(parentId: string, tree: ITree): ITree {
    if (this.id === parentId) {
      return new Tree(this.id, this.data, this.nodes.concat(tree), this.createdAt);
    }

    return new Leaf(this.id, this.data, this.createdAt);
  }

  replaceNodeById(id: string, node: ITree): ITree {
    if (this.id === id) {
      return node;
    }

    return new Leaf(this.id, this.data, this.createdAt);
  }

  updateNodeById(id: string, data: Data): ITree {
    if (this.id === id) {
      return new Leaf(this.id, data, this.createdAt);
    }

    return new Leaf(this.id, this.data, this.createdAt);
  }

  deleteNodeById(id: string): ITree {
    return this;
  }
}
