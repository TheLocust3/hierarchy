import { DataJSON } from '../json/tree-json';

export class Data {
  title: string = '';
  body: string = '';

  static fromJSON(json: DataJSON): Data {
    return new Data(json.title, json.body);
  }

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}

export interface ITree {
  uuid: String;
  data: Data;
  nodes: ReadonlyArray<ITree>;
}
