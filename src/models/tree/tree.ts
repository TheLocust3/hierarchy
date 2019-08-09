import { Data, ITree } from './tree-base';
import { TreeJSON } from '../json/tree-json';
import Leaf from './leaf';

export default class Tree implements ITree {
  private _id: string = '';
  private _nodes: ReadonlyArray<ITree> = [];
  private _data: Data = { title: '', body: '' };

  static fromJSON(json: TreeJSON): ITree {
    if (json.type === 'tree' && json.nodes != null) {
      return new Tree(
        json.id,
        Data.fromJSON(json.data),
        json.nodes.map((node) => this.fromJSON(node))
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
}
