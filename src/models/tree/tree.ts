import { Data, ITree } from './tree-base';
import { TreeJSON } from '../json/tree-json';
import Leaf from './leaf';
import SentinelNode from './sentinel-node';

export default class Tree implements ITree {
  private _id: string = '';
  private _nodes: ReadonlyArray<ITree> = [];
  private _data: Data = { title: '', body: '' };

  static fromJSON(json: TreeJSON): ITree {
    return new SentinelNode(this.fromJSONInner(json));
  }

  static fromJSONInner(json: TreeJSON): ITree {
    if (json.type === 'tree' && json.nodes != null) {
      return new Tree(
        json.id,
        Data.fromJSON(json.data),
        json.nodes.map((node) => this.fromJSONInner(node))
      );
    } else {
      return new Leaf(json.id, Data.fromJSON(json.data));
    }
  }

  constructor(id: string, data: Data, nodes: ReadonlyArray<ITree>) {
    this._id = id;
    this._data = data;
    this._nodes = nodes;
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

  updateNodeById(id: string, data: Data): ITree {
    if (this.id === id) {
      return new Tree(this.id, data, this.nodes);
    }

    return new Tree(this.id, this.data, this.nodes.map((node) => node.updateNodeById(id, data)));
  }

  deleteNodeById(id: string): ITree {
    return new Tree(
      this.id,
      this.data,
      this.nodes
        .filter((node) => {
          console.log(node.data.title);
          console.log(id);
          console.log(node.id !== id);
          return node.id !== id;
        })
        .map((node) => node.deleteNodeById(id))
    );
  }
}
