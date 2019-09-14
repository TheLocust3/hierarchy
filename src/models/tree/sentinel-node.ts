import moment from 'moment';

import { Data, ITree, Node } from './tree-base';
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

  get children() {
    if (this._tree === undefined) {
      return [];
    }

    return this._tree.children;
  }

  get createdAt() {
    if (this._tree === undefined) {
      return moment().valueOf();
    }

    return this._tree.createdAt;
  }

  isEmpty() {
    return this._tree === undefined || this._tree === null || this._tree instanceof SentinelNode;
  }

  containsITree(id: string) {
    return this._tree !== undefined && this._tree.containsITree(id);
  }

  getNodeById(id: string): ITree | undefined {
    if (this._tree === undefined) return undefined;

    if (this._tree.id === id) return this._tree;

    return this._tree.getNodeById(id);
  }

  insertITreeByParentId(parentId: string, tree: ITree): ITree {
    if (this._tree === undefined) {
      return new SentinelNode();
    }

    return new SentinelNode(this._tree.insertITreeByParentId(parentId, tree));
  }

  replaceNodeById(id: string, node: Node): ITree {
    if (this._tree === undefined) {
      return new SentinelNode();
    }

    return new SentinelNode(this._tree.replaceNodeById(id, node));
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
        new Node(this.id, this.data, this.createdAt),
        this.children.filter((node) => node.id !== id).map((node) => node.deleteNodeById(id))
      )
    );
  }
}
