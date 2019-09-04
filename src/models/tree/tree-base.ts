import { DataJSON } from '../json/tree-json';

export class Data {
  title: string = '';
  body: string = '';
  type: string = '';

  static fromJSON(json: DataJSON): Data {
    return new Data(json.title, json.body, json.type);
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

  constructor(title: string, body: string, type: string) {
    this.title = title;
    this.body = body;
    this.type = type;
  }
}

export interface ITree {
  id: string;
  data: Data;
  nodes: ReadonlyArray<ITree>;

  isEmpty: () => boolean;
  containsITree: (id: string) => boolean;

  insertNodeByParentId: (parentId: string, tree: ITree) => ITree;
  replaceNodeById: (id: string, node: ITree) => ITree;
  updateNodeById: (id: string, data: Data) => ITree;
  deleteNodeById: (id: string) => ITree;
}
