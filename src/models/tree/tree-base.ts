import { DataJSON } from '../json/tree-json';

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

export interface ITree {
  id: string;
  data: Data;
  nodes: ReadonlyArray<ITree>;
  createdAt: number;

  isEmpty: () => boolean;
  containsITree: (id: string) => boolean;

  getNodeById: (id: string) => ITree | undefined;
  insertNodeByParentId: (parentId: string, tree: ITree) => ITree;
  replaceNodeById: (id: string, node: ITree) => ITree;
  updateNodeById: (id: string, data: Data) => ITree;
  deleteNodeById: (id: string) => ITree;
}
