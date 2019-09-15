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

  get parents() {
    if (this._tree === undefined) {
      return [];
    }

    return this._tree.parents;
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

  addParent(tree: ITree) {
    if (this._tree === undefined) return;

    this._tree.addParent(tree);
  }

  findParentsByType(type: string) {
    if (this._tree === undefined) return [];

    return this._tree.findParentsByType(type);
  }

  findParentById(parentId: string): ITree | undefined {
    if (this._tree === undefined) return undefined;

    return this._tree.findParentById(parentId);
  }

  addParentRelationship(parentNode: ITree, childId: string): ITree {
    if (this._tree === undefined) return new SentinelNode();

    return this._tree.addParentRelationship(parentNode, childId);
  }

  deleteParentRelationship(parentId: string, childId: string): ITree {
    if (this._tree === undefined) {
      return new SentinelNode();
    }

    return this._tree.deleteParentRelationship(parentId, childId);
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
