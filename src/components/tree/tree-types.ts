import { DataJSON } from '../../api/tree-api';

export interface Viewport {
  width: number;
  height: number;
  x: number;
  y: number;
}

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
  render: (parentX: number, parentY: number, viewport: Viewport) => JSX.Element;
}
