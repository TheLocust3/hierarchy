import moment from 'moment';

import { Data, ITree } from './tree-base';
import { TreeJSON } from '../json/tree-json';
import Leaf from './leaf';
import SentinelNode from './sentinel-node';

export default class Tree implements ITree {
  private _id: string = '';
  private _nodes: ReadonlyArray<ITree> = [];
  private _data: Data = Data.empty();
  private _createdAt: number = moment().valueOf();

  static fromJSON(json: TreeJSON): ITree {
    return new SentinelNode(this.fromJSONInner(json));
  }

  static fromJSONInner(json: TreeJSON): ITree {
    if (json.type === 'tree' && json.nodes != null) {
      return new Tree(
        json.id,
        Data.fromJSON(json.data),
        json.nodes.map((node) => this.fromJSONInner(node)),
        json.createdAt
      );
    } else {
      return Leaf.fromJSON(json);
    }
  }

  constructor(id: string, data: Data, nodes: ReadonlyArray<ITree>, createdAt: number) {
    this._id = id;
    this._data = data;
    this._nodes = nodes;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  get nodes() {
    return this._nodes;
  }

  get data() {
    return this._data;
  }

  get createdAt() {
    return this._createdAt;
  }

  isEmpty() {
    return false;
  }

  containsITree(id: string) {
    return (
      this.id === id ||
      this.nodes.reduce((acc: boolean, t: ITree) => t.containsITree(id) || acc, false)
    );
  }

  getNodeById(id: string): ITree | undefined {
    const nodes = this.nodes
      .flatMap((node) => node.getNodeById(id))
      .concat(this.id === id ? this : undefined)
      .filter((node) => node !== undefined);
    if (nodes.length === 0) return undefined;

    return nodes[0];
  }

  insertNodeByParentId(parentId: string, tree: ITree): ITree {
    if (this.id === parentId) {
      return new Tree(this.id, this.data, this.nodes.concat(tree), this.createdAt);
    }

    return new Tree(
      this.id,
      this.data,
      this.nodes.map((node) => node.insertNodeByParentId(parentId, tree)),
      this.createdAt
    );
  }

  replaceNodeById(id: string, node: ITree): ITree {
    if (this.id === id) {
      return node;
    }

    return new Tree(
      this.id,
      this.data,
      this.nodes.map((n) => n.replaceNodeById(id, node)),
      this.createdAt
    );
  }

  updateNodeById(id: string, data: Data): ITree {
    if (this.id === id) {
      return new Tree(this.id, data, this.nodes, this.createdAt);
    }

    return new Tree(
      this.id,
      this.data,
      this.nodes.map((node) => node.updateNodeById(id, data)),
      this.createdAt
    );
  }

  deleteNodeById(id: string): ITree {
    return new Tree(
      this.id,
      this.data,
      this.nodes
        .filter((node) => {
          return node.id !== id;
        })
        .map((node) => node.deleteNodeById(id)),
      this.createdAt
    );
  }
}
