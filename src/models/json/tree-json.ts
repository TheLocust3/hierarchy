export interface DataJSON {
  title: string;
  body: string;
  dueOn?: number;
  type: string;
  color?: string;
}

export interface NodeJSON {
  id: string;
  data: DataJSON;
  createdAt: number;
}

export interface AdjacencyEntry {
  parentId: string;
  childIds: ReadonlyArray<string>;
}

export interface TreeJSON {
  rootNodeId: string;
  nodes: ReadonlyArray<NodeJSON>;
  adjacencyList: ReadonlyArray<AdjacencyEntry>;
}

export interface TreeResponse {
  tree: TreeJSON;
}

export interface NodeResponse {
  node: NodeJSON;
}

export interface ListOfNodesResponse {
  nodes: ReadonlyArray<NodeJSON>;
}

export interface ListOfTreesResponse {
  trees: ReadonlyArray<TreeJSON>;
}

export interface TreeSuccessResponse {
  success: string;
}
