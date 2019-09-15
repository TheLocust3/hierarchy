import { ITree, Node } from './tree-base';
import { TreeJSON } from '../json/tree-json';
import Leaf from './leaf';
import SentinelNode from './sentinel-node';

export default class Tree implements ITree {
  private _node: Node = Node.empty();
  private _children: ReadonlyArray<ITree> = [];
  private _parents: ReadonlyArray<ITree> = [];

  static fromJSON(json: TreeJSON): ITree {
    const nodes = json.nodes.map((node) => Node.fromJSON(node));

    const rootNode = nodes.find((node) => node.id === json.rootNodeId);
    if (rootNode === undefined) throw new Error('Failed to parse server response');

    const parent2Children = new Map<Node, ReadonlyArray<Node>>();
    json.adjacencyList.forEach((entry) => {
      const parent = nodes.find((node) => node.id === entry.parentId);
      if (parent === undefined) throw new Error('Failed to parse server response');

      const children = entry.childIds.flatMap((childId) => {
        const node = nodes.find((node) => node.id === childId);

        if (node === undefined) return [];
        return [node];
      });

      parent2Children.set(parent, children);
    });

    const tree = new SentinelNode(this.fromJSONInner(rootNode, parent2Children));

    parent2Children.forEach((children, parent) => {
      const parentTree = tree.getNodeById(parent.id);
      const realParentTree =
        parentTree === undefined
          ? new SentinelNode(this.fromJSONInner(parent, parent2Children))
          : parentTree;

      children.forEach((child) => {
        const childTree = tree.getNodeById(child.id);
        if (childTree === undefined) return;

        childTree.addParent(realParentTree);
      });
    });

    return tree;
  }

  static fromJSONInner(node: Node, parent2Children: Map<Node, ReadonlyArray<Node>>): ITree {
    const children = parent2Children.get(node);
    if (children === undefined || children === []) {
      return new Leaf(node);
    }

    return new Tree(node, children.map((child) => this.fromJSONInner(child, parent2Children)));
  }

  constructor(node: Node, children: ReadonlyArray<ITree>, parents?: ReadonlyArray<ITree>) {
    this._node = node;
    this._children = children;
    this._parents = parents === undefined ? [] : parents;
  }

  get id() {
    return this._node.id;
  }

  get children() {
    return this._children;
  }

  get parents() {
    return this._parents;
  }

  get data() {
    return this._node.data;
  }

  get createdAt() {
    return this._node.createdAt;
  }

  isEmpty() {
    return false;
  }

  containsITree(id: string) {
    return (
      this.id === id ||
      this.children.reduce((acc: boolean, t: ITree) => t.containsITree(id) || acc, false)
    );
  }

  addParent(tree: ITree) {
    this._parents = this.parents.concat(tree);
  }

  findParentsByType(type: string) {
    return this.parents
      .filter((parent) => parent.data.type === type)
      .concat(this.parents.flatMap((parent) => parent.findParentsByType(type)));
  }

  findParentById(parentId: string): ITree | undefined {
    const foundParent = this.parents.find((parent) => parent.id === parentId);
    if (foundParent !== undefined) return foundParent;

    const nodes = this.children
      .flatMap((child) => child.findParentById(parentId))
      .filter((node) => node !== undefined);
    if (nodes.length === 0) return undefined;

    return nodes[0];
  }

  addParentRelationship(parentNode: ITree, childId: string): ITree {
    if (this.id === childId)
      return new Tree(this._node, this.children, this.parents.concat(parentNode));

    return new Tree(
      this._node,
      this.children.map((node) => node.addParentRelationship(parentNode, childId)),
      this.parents
    );
  }

  deleteParentRelationship(parentId: string, childId: string): ITree {
    if (childId === this.id) {
      return new Tree(
        this._node,
        this.children,
        this.parents.filter((parent) => parent.id !== parentId)
      );
    }

    return new Tree(
      this._node,
      this.children.map((child) => child.deleteParentRelationship(parentId, childId)),
      this.parents
    );
  }

  getNodeById(id: string): ITree | undefined {
    const nodes = this.children
      .flatMap((node) => node.getNodeById(id))
      .concat(this.id === id ? this : undefined)
      .filter((node) => node !== undefined);
    if (nodes.length === 0) return undefined;

    return nodes[0];
  }

  insertITreeByParentId(parentId: string, tree: ITree): ITree {
    if (this.id === parentId) {
      return new Tree(this._node, this.children.concat(tree), this.parents);
    }

    return new Tree(
      this._node,
      this.children.map((node) => node.insertITreeByParentId(parentId, tree), this.parents)
    );
  }

  replaceNodeById(id: string, node: Node): ITree {
    if (this.id === id) {
      return new Tree(node, this.children, this.parents);
    }

    return new Tree(
      this._node,
      this.children.map((n) => n.replaceNodeById(id, node)),
      this.parents
    );
  }

  deleteNodeById(id: string): ITree {
    return new Tree(
      this._node,
      this.children
        .filter((node) => {
          return node.id !== id;
        })
        .map((node) => node.deleteNodeById(id)),
      this.parents
    );
  }
}
