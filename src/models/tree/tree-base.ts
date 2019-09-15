import moment from 'moment';

import { DataJSON, NodeJSON } from '../json/tree-json';

export class Data {
  title: string = '';
  body: string = '';
  dueOn?: number;
  type: string = '';

  static fromJSON(json: DataJSON): Data {
    return new Data(json.title, json.body, json.type, json.dueOn === null ? undefined : json.dueOn);
  }

  static empty(): Data {
    return new Data('', '', 'card');
  }

  static default(): Data {
    return this.defaultWithType('card');
  }

  static defaultWithType(type: string): Data {
    return new Data('Title', 'Description', type);
  }

  constructor(title: string, body: string, type: string, dueOn?: number) {
    this.title = title;
    this.body = body;
    this.dueOn = dueOn;
    this.type = type;
  }
}

export class Node {
  private _id: string = '';
  private _data: Data = Data.empty();
  private _createdAt: number = moment().valueOf();

  static fromJSON(json: NodeJSON) {
    return new Node(json.id, json.data, json.createdAt);
  }

  static empty() {
    return new Node('', Data.empty(), moment().valueOf());
  }

  constructor(id: string, data: Data, createdAt: number) {
    this._id = id;
    this._data = data;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  get data() {
    return this._data;
  }

  get createdAt() {
    return this._createdAt;
  }
}

export interface ITree {
  id: string;
  data: Data;
  children: ReadonlyArray<ITree>;
  parents: ReadonlyArray<ITree>;
  createdAt: number;

  isEmpty: () => boolean;
  containsITree: (id: string) => boolean;

  addParent: (tree: ITree) => void;
  findParentsByType: (type: string) => ReadonlyArray<ITree>;
  findParentById: (parentId: string) => ITree | undefined;
  addParentRelationship: (parentNode: ITree, childId: string) => ITree;
  deleteParentRelationship: (parentId: string, childId: string) => ITree;

  getNodeById: (id: string) => ITree | undefined;
  insertITreeByParentId: (parentId: string, tree: ITree) => ITree;
  replaceNodeById: (id: string, node: Node) => ITree;
  updateNodeById: (id: string, data: Data) => ITree;
  deleteNodeById: (id: string) => ITree;
}
