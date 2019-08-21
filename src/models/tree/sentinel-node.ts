import { Data, ITree } from './tree-base';
import Tree from './tree';

export default class SentinelNode implements ITree {
  private _tree?: ITree;

  constructor(tree?: ITree) {
    this._tree = tree;
  }

  get id() {
    if (this._tree === undefined) {
      return '';
    }

    return this._tree.id;
  }

  get data() {
    if (this._tree === undefined) {
      return Data.empty();
    }

    return this._tree.data;
  }

  get nodes() {
    if (this._tree === undefined) {
      return [];
    }

    return this._tree.nodes;
  }

  insertNodeByParentId(parentId: string, tree: ITree): ITree {
    if (this._tree === undefined) {
      return new SentinelNode();
    }

    return new SentinelNode(this._tree.insertNodeByParentId(parentId, tree));
  }

  updateNodeById(id: string, data: Data): ITree {
    if (this._tree === undefined) {
      return new SentinelNode();
    }

    return new SentinelNode(this._tree.updateNodeById(id, data));
  }

  deleteNodeById(id: string): ITree {
    if (this.id === id) {
      return new SentinelNode();
    }

    return new SentinelNode(
      new Tree(
        this.id,
        this.data,
        this.nodes.filter((node) => node.id !== id).map((node) => node.deleteNodeById(id))
      )
    );
  }
}
