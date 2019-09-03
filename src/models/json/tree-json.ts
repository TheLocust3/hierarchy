export interface DataJSON {
  title: string;
  body: string;
  type: string;
}

export interface TreeJSON {
  id: string;
  data: DataJSON;
  nodes?: ReadonlyArray<TreeJSON>;
  type: string;
}

export interface TreeResponse {
  tree: TreeJSON;
}

export interface ListOfTreesResponse {
  trees: ReadonlyArray<TreeJSON>;
}

export interface TreeSuccessResponse {
  success: string;
}
