import { Data, ITree } from './tree-base';
import Tree from './tree';

export default class Leaf implements ITree {
  private _id: string = '';
  private _data: Data = Data.empty();
  private _nodes: ReadonlyArray<ITree> = [];

  constructor(id: string, data: Data) {
    this._id = id;
    this._data = data;
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

  insertNodeByParentId(parentId: string, tree: ITree): ITree {
    if (this.id === parentId) {
      return new Tree(this.id, this.data, this.nodes.concat(tree));
    }

    return new Leaf(this.id, this.data);
  }

  replaceNodeById(id: string, node: ITree): ITree {
    if (this.id === id) {
      return node;
    }

    return new Leaf(this.id, this.data);
  }

  updateNodeById(id: string, data: Data): ITree {
    if (this.id === id) {
      return new Leaf(this.id, data);
    }

    return new Leaf(this.id, this.data);
  }

  deleteNodeById(id: string): ITree {
    return this;
  }
}
