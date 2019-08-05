import { API_ENDPOINT } from '../constants';
import { ITree, Data } from '../models/tree/tree-base';
import Tree from '../models/tree/tree';
import { TreeResponse, ListOfTreesResponse, TreeSuccessResponse } from '../models/json/tree-json';

export interface TreeApiStructure {
  getAllTrees(): Promise<ReadonlyArray<ITree>>;
  getTree(uuid: String): Promise<ITree>;
  createLeaf(data: Data, parentUuid: String): Promise<String>;
  updateTree(uuid: String, data: Data): Promise<String>;
  deleteTree(uuid: String): Promise<String>;
}

const TreeApi: TreeApiStructure = {
  async getAllTrees(): Promise<ReadonlyArray<ITree>> {
    const response = await fetch(`${API_ENDPOINT}/tree`, { method: 'GET' });
    const json: ListOfTreesResponse = await response.json();

    return json.trees.map((tree) => Tree.fromJSON(tree));
  },

  async getTree(uuid: String): Promise<ITree> {
    const response = await fetch(`${API_ENDPOINT}/tree/${uuid}`, { method: 'GET' });
    const json: TreeResponse = await response.json();

    return Tree.fromJSON(json.tree);
  },

  async createLeaf(data: Data, parentUuid: String): Promise<String> {
    const response = await fetch(`${API_ENDPOINT}/tree`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data, parentUuid: parentUuid })
    });
    console.log(await response)

    const json: TreeSuccessResponse = await response.json();

    return json.success;
  },

  async updateTree(uuid: String, data: Data): Promise<String> {
    const response = await fetch(`${API_ENDPOINT}/tree/${uuid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    });

    const json: TreeSuccessResponse = await response.json();

    return json.success;
  },

  async deleteTree(uuid: String): Promise<String> {
    const response = await fetch(`${API_ENDPOINT}/tree/${uuid}`, { method: 'DELETE' });
    const json: TreeSuccessResponse = await response.json();

    return json.success;
  }
};

export default TreeApi;
