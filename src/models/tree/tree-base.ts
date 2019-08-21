import { DataJSON } from '../json/tree-json';

export class Data {
  title: string = '';
  body: string = '';

  static fromJSON(json: DataJSON): Data {
    return new Data(json.title, json.body);
  }

  static empty(): Data {
    return new Data('', '');
  }

  static default(): Data {
    return new Data('Title', 'Description');
  }

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}

export interface ITree {
  id: string;
  data: Data;
  nodes: ReadonlyArray<ITree>;

  insertNodeByParentId: (parentId: string, tree: ITree) => ITree;
  updateNodeById: (id: string, data: Data) => ITree;
  deleteNodeById: (id: string) => ITree;
}
