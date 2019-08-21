import { API_ENDPOINT } from '../constants';
import { ITree, Data } from '../models/tree/tree-base';
import Tree from '../models/tree/tree';
import { TreeResponse, ListOfTreesResponse, TreeSuccessResponse } from '../models/json/tree-json';

export interface TreeApiStructure {
  getAllTrees(): Promise<ReadonlyArray<ITree>>;
  getTree(id: string): Promise<ITree>;
  createLeaf(parentId: string, data: Data): Promise<ITree>;
  updateTree(id: string, data: Data): Promise<ITree>;
  deleteTree(id: string): Promise<string>;
}

const TreeApi: TreeApiStructure = {
  async getAllTrees(): Promise<ReadonlyArray<ITree>> {
    const response = await fetch(`${API_ENDPOINT}/tree`, { method: 'GET' });
    const json: ListOfTreesResponse = await response.json();

    return json.trees.map((tree) => Tree.fromJSON(tree));
  },

  async getTree(id: string): Promise<ITree> {
    const response = await fetch(`${API_ENDPOINT}/tree/${id}`, { method: 'GET' });
    const json: TreeResponse = await response.json();

    return Tree.fromJSON(json.tree);
  },

  async createLeaf(parentId: string, data: Data): Promise<ITree> {
    const response = await fetch(`${API_ENDPOINT}/tree`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data, parentId: parentId })
    });

    const json: TreeResponse = await response.json();

    return Tree.fromJSONInner(json.tree);
  },

  async updateTree(id: string, data: Data): Promise<ITree> {
    const response = await fetch(`${API_ENDPOINT}/tree/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    });

    const json: TreeResponse = await response.json();

    return Tree.fromJSONInner(json.tree);
  },

  async deleteTree(id: string): Promise<string> {
    const response = await fetch(`${API_ENDPOINT}/tree/${id}`, { method: 'DELETE' });
    const json: TreeSuccessResponse = await response.json();

    return json.success;
  }
};

export default TreeApi;
