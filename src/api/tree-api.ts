import { API_ENDPOINT } from '../constants';
import { ITree, Data } from '../models/tree/tree-base';
import Tree from '../models/tree/Tree';
import { TreeResponse, ListOfTreesResponse, TreeSuccessResponse } from '../models/json/tree-json';

export interface TreeApiStructure {
  getAllTrees(): Promise<ReadonlyArray<ITree>>;
  getTree(uuid: String): Promise<ITree>;
  createLeaf(data: Data, parentUuid: String): Promise<Boolean>;
  updateTree(uuid: String, data: Data): Promise<Boolean>;
  deleteTree(uuid: String): Promise<Boolean>;
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

  async createLeaf(data: Data, parentUuid: String): Promise<Boolean> {
    const response = await fetch(`${API_ENDPOINT}/tree`, {
      method: 'POST',
      body: JSON.stringify({ data: data, parentUuid: parentUuid })
    });
    const json: TreeSuccessResponse = await response.json();

    return json.success === 'ok';
  },

  async updateTree(uuid: String, data: Data): Promise<Boolean> {
    const response = await fetch(`${API_ENDPOINT}/tree/${uuid}`, {
      method: 'PATCH',
      body: JSON.stringify({ data: data })
    });
    const json: TreeSuccessResponse = await response.json();

    return json.success === 'ok';
  },

  async deleteTree(uuid: String): Promise<Boolean> {
    const response = await fetch(`${API_ENDPOINT}/tree/${uuid}`, { method: 'DELETE' });
    const json: TreeSuccessResponse = await response.json();

    return json.success === 'ok';
  }
};

export default TreeApi;
