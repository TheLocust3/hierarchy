import { DataJSON } from '../json/tree-json';

export class Data {
  title: string = '';
  body: string = '';
  status: string = '';

  static fromJSON(json: DataJSON): Data {
    return new Data(json.title, json.body, json.status);
  }

  static empty(): Data {
    return new Data('', '', 'none');
  }

  static default(): Data {
    return new Data('Title', 'Description', 'none');
  }

  constructor(title: string, body: string, status: string) {
    this.title = title;
    this.body = body;
    this.status = status;
  }
}

export interface ITree {
  id: string;
  data: Data;
  nodes: ReadonlyArray<ITree>;

  insertNodeByParentId: (parentId: string, tree: ITree) => ITree;
  replaceNodeById: (id: string, node: ITree) => ITree;
  updateNodeById: (id: string, data: Data) => ITree;
  deleteNodeById: (id: string) => ITree;
}
