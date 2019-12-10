import { ThunkAction } from 'redux-thunk';
import uuid from 'uuid/v4';
import moment from 'moment';

import { AppState } from '../types';
import { TreeOverlay } from '../reducers/tree-reducer';
import { ITree, Data, Node } from '../models/tree/tree-base';
import TreeApi from '../api/tree-api';

export const REQUEST_ALL_TREES = 'REQUEST_ALL_TREES';
export const RECEIVE_ALL_TREES = 'RECEIVE_ALL_TREES';

export const REQUEST_TREE = 'REQUEST_TREE';
export const RECEIVE_TREE = 'RECEIVE_TREE';

export const REQUEST_LEAVES = 'REQUEST_LEAVES';
export const RECEIVE_LEAVES = 'RECEIVE_LEAVES';

export const SET_OVERLAY = 'SET_OVERLAY';

export const CREATE_LEAF = 'CREATE_LEAF';
export const DELETE_NODE = 'DELETE_NODE';
export const REPLACE_NODE = 'REPLACE_NODE';

export const CREATE_RELATIONSHIP = 'CREATE_RELATIONSHIP';
export const DELETE_RELATIONSHIP = 'DELETE_RELATIONSHIP';

interface RequestAllTreesAction {
  type: typeof REQUEST_ALL_TREES;
}

interface ReceiveAllTreesAction {
  type: typeof RECEIVE_ALL_TREES;
  payload: ReadonlyArray<Node>;
}

interface RequestTreeAction {
  type: typeof REQUEST_TREE;
}

interface ReceiveTreeAction {
  type: typeof RECEIVE_TREE;
  payload: ITree;
}

interface RequestLeavesAction {
  type: typeof REQUEST_LEAVES;
}

interface ReceiveLeavesAction {
  type: typeof RECEIVE_LEAVES;
  payload: ReadonlyArray<Node>;
}

interface SetOverlayAction {
  type: typeof SET_OVERLAY;
  payload: TreeOverlay;
}

interface CreateLeafAction {
  type: typeof CREATE_LEAF;
  parentId: string;
  node: Node;
}

interface DeleteNodeAction {
  type: typeof DELETE_NODE;
  id: string;
}

interface ReplaceNodeAction {
  type: typeof REPLACE_NODE;
  id: string;
  node: Node;
}

interface CreateRelationshipAction {
  type: typeof CREATE_RELATIONSHIP;
  parentId: string;
  childId: string;
}

interface DeleteRelationshipAction {
  type: typeof DELETE_RELATIONSHIP;
  parentId: string;
  childId: string;
}

export type TreeActionTypes =
  | RequestAllTreesAction
  | ReceiveAllTreesAction
  | RequestTreeAction
  | ReceiveTreeAction
  | RequestLeavesAction
  | ReceiveLeavesAction
  | SetOverlayAction
  | CreateLeafAction
  | DeleteNodeAction
  | ReplaceNodeAction
  | CreateRelationshipAction
  | DeleteRelationshipAction;

const InternalActions = {
  requestAllTrees(): TreeActionTypes {
    return {
      type: REQUEST_ALL_TREES
    };
  },

  receiveAllTrees(nodes: ReadonlyArray<Node>): TreeActionTypes {
    return {
      type: RECEIVE_ALL_TREES,
      payload: nodes
    };
  },

  requestTree(): TreeActionTypes {
    return {
      type: REQUEST_TREE
    };
  },

  receiveTree(tree: ITree): TreeActionTypes {
    return {
      type: RECEIVE_TREE,
      payload: tree
    };
  },

  requestLeaves(): TreeActionTypes {
    return {
      type: REQUEST_LEAVES
    };
  },

  receiveLeaves(leaves: ReadonlyArray<Node>): TreeActionTypes {
    return {
      type: RECEIVE_LEAVES,
      payload: leaves
    };
  },

  createLeaf(parentId: string, node: Node): TreeActionTypes {
    return {
      type: CREATE_LEAF,
      parentId: parentId,
      node: node
    };
  },

  deleteNodeById(id: string): TreeActionTypes {
    return {
      type: DELETE_NODE,
      id: id
    };
  },

  replaceNodeById(id: string, node: Node): TreeActionTypes {
    return {
      type: REPLACE_NODE,
      id: id,
      node: node
    };
  },

  createRelationship(parentId: string, childId: string): TreeActionTypes {
    return {
      type: CREATE_RELATIONSHIP,
      parentId: parentId,
      childId: childId
    };
  },

  deleteRelationship(parentId: string, childId: string): TreeActionTypes {
    return {
      type: DELETE_RELATIONSHIP,
      parentId: parentId,
      childId: childId
    };
  }
};

export function setOverlay(overlay: TreeOverlay): TreeActionTypes {
  return {
    type: SET_OVERLAY,
    payload: overlay
  };
}

export const getAllTrees = (): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.requestAllTrees());

    const trees = await TreeApi.getAllTrees();
    dispatch(InternalActions.receiveAllTrees(trees));
  };
};

export function getTree(id: string): ThunkAction<void, AppState, null, TreeActionTypes> {
  return async (dispatch) => {
    dispatch(InternalActions.requestTree());

    const tree = await TreeApi.getTree(id);
    dispatch(InternalActions.receiveTree(tree));
  };
}

export function getLeaves(id: string): ThunkAction<void, AppState, null, TreeActionTypes> {
  return async (dispatch) => {
    dispatch(InternalActions.requestLeaves());

    const leaves = await TreeApi.getLeaves(id);
    dispatch(InternalActions.receiveLeaves(leaves));
  };
}

export const createRootLeaf = (
  type: string
): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    const node = new Node(uuid(), Data.defaultWithType(type), moment().valueOf());
    dispatch(InternalActions.createLeaf('', node));

    const responseNode = await TreeApi.createLeaf('', node.data);
    dispatch(InternalActions.replaceNodeById(node.id, responseNode));
  };
};

export const createLeaf = (
  parentId: string
): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    const node = new Node(uuid(), Data.default(), moment().valueOf());
    dispatch(InternalActions.createLeaf(parentId, node));

    const responseNode = await TreeApi.createLeaf(parentId, node.data);
    dispatch(InternalActions.replaceNodeById(node.id, responseNode));
  };
};

export const updateNode = (
  id: string,
  data: Data
): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.replaceNodeById(id, new Node(id, data, moment().valueOf())));

    const node = await TreeApi.updateTree(id, data);
    dispatch(InternalActions.replaceNodeById(node.id, node));
  };
};

export const deleteNode = (id: string): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    await TreeApi.deleteTree(id);

    dispatch(InternalActions.deleteNodeById(id));
  };
};

export const createRelationship = (
  parentId: string,
  childId: string
): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.createRelationship(parentId, childId));

    const node = await TreeApi.createRelationship(parentId, childId);
    dispatch(InternalActions.replaceNodeById(node.id, node));
    // TODO: Make the update more relevant (pull latest label trees and such)
  };
};

export const deleteRelationship = (
  parentId: string,
  childId: string
): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.deleteRelationship(parentId, childId));

    await TreeApi.deleteRelationship(parentId, childId);
  };
};
