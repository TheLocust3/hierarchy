export interface DataJSON {
  title: string;
  body: string;
}

export interface TreeJSON {
  uuid: string;
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
