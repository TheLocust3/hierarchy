import { API_ENDPOINT } from '../constants';
import { ITree, Data } from '../models/tree/tree-base';
import Tree from '../models/tree/tree';
import { TreeResponse, ListOfTreesResponse, TreeSuccessResponse } from '../models/json/tree-json';
import Leaf from '../models/tree/leaf';

const TreeApi = {
  async getAllTrees(): Promise<ReadonlyArray<ITree>> {
    const response = await fetch(`${API_ENDPOINT}/tree`, { method: 'GET' });
    const json: ListOfTreesResponse = await response.json();

    return json.trees.map((tree) => Tree.fromJSON(tree));
  },

  async getAllLabelTrees(): Promise<ReadonlyArray<ITree>> {
    const response = await fetch(`${API_ENDPOINT}/tree/labels`, { method: 'GET' });
    const json: ListOfTreesResponse = await response.json();

    return json.trees.map((tree) => Tree.fromJSON(tree));
  },

  async getTree(id: string): Promise<ITree> {
    const response = await fetch(`${API_ENDPOINT}/tree/${id}`, { method: 'GET' });
    const json: TreeResponse = await response.json();

    return Tree.fromJSON(json.tree);
  },

  async getTreeAsList(rootId: string): Promise<ReadonlyArray<Leaf>> {
    const response = await fetch(`${API_ENDPOINT}/tree/${rootId}/list`, { method: 'GET' });
    const json: ListOfTreesResponse = await response.json();

    return json.trees.map((leaf) => Leaf.fromJSON(leaf));
  },

  async createLeaf(parentId: string, data: Data): Promise<ITree> {
    let payload: any = { data: data };
    if (parentId) {
      payload.parentId = parentId;
    }

    const response = await fetch(`${API_ENDPOINT}/tree`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
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
  },

  async createRelationship(parentId: string, childId: string): Promise<ITree> {
    const response = await fetch(`${API_ENDPOINT}/tree/${parentId}/${childId}`, { method: 'POST' });
    const json: TreeResponse = await response.json();

    return Tree.fromJSONInner(json.tree);
  }
};

export default TreeApi;
