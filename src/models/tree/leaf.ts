import { ITree, Node } from './tree-base';
import Tree from './tree';

export default class Leaf implements ITree {
  private _node: Node = Node.empty();
  private _children: ReadonlyArray<ITree> = [];
  private _parents: ReadonlyArray<ITree> = [];

  constructor(node: Node, parents?: ReadonlyArray<ITree>) {
    this._node = node;
    this._parents = parents === undefined ? [] : parents;
  }

  get id() {
    return this._node.id;
  }

  get data() {
    return this._node.data;
  }

  get children() {
    return this._children;
  }

  get parents() {
    return this._parents;
  }

  get createdAt() {
    return this._node.createdAt;
  }

  get color() {
    const parents = this.findParentsByType('card');
    if (this._node.data.color === undefined && parents.length >= 1) {
      return parents[0].color;
    }

    return this._node.data.color;
  }

  isEmpty() {
    return false;
  }

  containsITree(id: string) {
    return this.id === id;
  }

  addParent(tree: ITree) {
    let added = false;
    this._parents = this.parents.map((parent) => {
      if (parent.id === tree.id) {
        added = true;
        return tree;
      }

      return parent;
    });

    if (!added) {
      this._parents = this._parents.concat(tree);
    }
  }

  findParentsByType(type: string) {
    return this.parents
      .filter((parent) => parent.data.type === type)
      .concat(this.parents.flatMap((parent) => parent.findParentsByType(type)));
  }

  findParentById(parentId: string): ITree | undefined {
    const foundParent = this.parents.find((parent) => parent.id === parentId);
    if (foundParent !== undefined) return foundParent;

    return undefined;
  }

  addParentRelationship(parentNode: ITree, childId: string): ITree {
    if (this.id === childId) return new Leaf(this._node, this.parents.concat(parentNode));

    return this;
  }

  deleteParentRelationship(parentId: string, childId: string): ITree {
    if (childId === this.id) {
      return new Leaf(this._node, this.parents.filter((parent) => parent.id !== parentId));
    }

    return this;
  }

  getNodeById(id: string): ITree | undefined {
    if (this.id === id) return this;

    return undefined;
  }

  insertITreeByParentId(parentId: string, tree: ITree): ITree {
    if (this.id === parentId) {
      tree.addParent(this);
      return new Tree(this._node, this.children.concat(tree));
    }

    return new Leaf(this._node, this.parents);
  }

  replaceNodeById(id: string, node: Node): ITree {
    if (this.id === id) {
      return new Leaf(node, this.parents);
    }

    return new Leaf(this._node, this.parents);
  }

  deleteNodeById(id: string): ITree {
    return this;
  }
}
