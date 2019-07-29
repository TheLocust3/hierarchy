export interface Viewport {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface Data {
  title: string;
  body: string;
}

export interface ITree {
  uuid: String;
  data: Data;
  nodes: ReadonlyArray<ITree>;
  render: (parentX: number, parentY: number, viewport: Viewport) => JSX.Element;
}
