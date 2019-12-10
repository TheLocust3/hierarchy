import { API_ENDPOINT } from '../constants';
import { ITree, Data, Node } from '../models/tree/tree-base';
import Tree from '../models/tree/tree';
import {
  TreeResponse,
  ListOfNodesResponse,
  TreeSuccessResponse,
  NodeResponse
} from '../models/json/tree-json';

const TreeApi = {
  async getAllTrees(): Promise<ReadonlyArray<Node>> {
    const response = await fetch(`${API_ENDPOINT}/tree`, { method: 'GET' });

    const json: ListOfNodesResponse = await response.json();
    return json.nodes.map((node) => Node.fromJSON(node));
  },

  async getTree(id: string): Promise<ITree> {
    const response = await fetch(`${API_ENDPOINT}/tree/${id}`, { method: 'GET' });

    const json: TreeResponse = await response.json();
    return Tree.fromJSON(json.tree);
  },

  async getLeaves(id: string): Promise<ReadonlyArray<Node>> {
    const response = await fetch(`${API_ENDPOINT}/tree/${id}/leaves`, { method: 'GET' });

    const json: ListOfNodesResponse = await response.json();
    return json.nodes.map((node) => Node.fromJSON(node));
  },

  async createLeaf(parentId: string, data: Data): Promise<Node> {
    let payload: any = { data: data };
    if (parentId) {
      payload.parentId = parentId;
    }

    const response = await fetch(`${API_ENDPOINT}/tree`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const json: NodeResponse = await response.json();
    return Node.fromJSON(json.node);
  },

  async updateTree(id: string, data: Data): Promise<Node> {
    const response = await fetch(`${API_ENDPOINT}/tree/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    });

    const json: NodeResponse = await response.json();
    return Node.fromJSON(json.node);
  },

  async deleteTree(id: string): Promise<string> {
    const response = await fetch(`${API_ENDPOINT}/tree/${id}`, { method: 'DELETE' });
    const json: TreeSuccessResponse = await response.json();

    return json.success;
  },

  async createRelationship(parentId: string, childId: string): Promise<Node> {
    const response = await fetch(`${API_ENDPOINT}/tree/${parentId}/${childId}`, { method: 'POST' });

    const json: NodeResponse = await response.json();
    return Node.fromJSON(json.node);
  },

  async deleteRelationship(parentId: string, childId: string): Promise<string> {
    const response = await fetch(`${API_ENDPOINT}/tree/${parentId}/${childId}`, {
      method: 'DELETE'
    });
    const json: TreeSuccessResponse = await response.json();

    return json.success;
  }
};

export default TreeApi;
