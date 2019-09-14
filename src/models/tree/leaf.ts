import { Data, ITree, Node } from './tree-base';
import Tree from './tree';

export default class Leaf implements ITree {
  private _node: Node = Node.empty();
  private _children: ReadonlyArray<ITree> = [];

  constructor(node: Node) {
    this._node = node;
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

  get createdAt() {
    return this._node.createdAt;
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

  insertITreeByParentId(parentId: string, tree: ITree): ITree {
    if (this.id === parentId) {
      return new Tree(this._node, this.children.concat(tree));
    }

    return new Leaf(this._node);
  }

  replaceNodeById(id: string, node: Node): ITree {
    if (this.id === id) {
      return new Leaf(node);
    }

    return new Leaf(this._node);
  }

  updateNodeById(id: string, data: Data): ITree {
    if (this.id === id) {
      return new Leaf(this._node);
    }

    return new Leaf(this._node);
  }

  deleteNodeById(id: string): ITree {
    return this;
  }
}
