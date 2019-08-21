import { Data, ITree } from './tree-base';

export default class Leaf implements ITree {
  private _id: string = '';
  private _data: Data = { title: '', body: '' };
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
