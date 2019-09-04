import { ThunkAction } from 'redux-thunk';
import uuid from 'uuid/v4';

import { AppState } from '../types';
import { TreeOverlay } from '../reducers/tree-reducer';
import { ITree, Data } from '../models/tree/tree-base';
import TreeApi from '../api/tree-api';
import Leaf from '../models/tree/leaf';

export const REQUEST_ALL_TREES = 'REQUEST_ALL_TREES';
export const RECEIVE_ALL_TREES = 'RECEIVE_ALL_TREES';

export const REQUEST_TREE = 'REQUEST_TREE';
export const RECEIVE_TREE = 'RECEIVE_TREE';

export const SET_OVERLAY = 'SET_OVERLAY';

export const CREATE_LEAF = 'CREATE_LEAF';
export const UPDATE_NODE = 'UPDATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const REPLACE_NODE = 'REPLACE_NODE';

interface RequestAllTreesAction {
  type: typeof REQUEST_ALL_TREES;
}

interface ReceiveAllTreesAction {
  type: typeof RECEIVE_ALL_TREES;
  payload: ReadonlyArray<ITree>;
}

interface RequestTreeAction {
  type: typeof REQUEST_TREE;
}

interface ReceiveTreeAction {
  type: typeof RECEIVE_TREE;
  payload: ITree;
}

interface SetOverlayAction {
  type: typeof SET_OVERLAY;
  payload: TreeOverlay;
}

interface CreateLeafAction {
  type: typeof CREATE_LEAF;
  parentId: string;
  leaf: Leaf;
}

interface UpdateNodeAction {
  type: typeof UPDATE_NODE;
  id: string;
  data: Data;
}

interface DeleteNodeAction {
  type: typeof DELETE_NODE;
  id: string;
}

interface ReplaceNodeAction {
  type: typeof REPLACE_NODE;
  id: string;
  node: ITree;
}

export type TreeActionTypes =
  | RequestAllTreesAction
  | ReceiveAllTreesAction
  | RequestTreeAction
  | ReceiveTreeAction
  | SetOverlayAction
  | CreateLeafAction
  | UpdateNodeAction
  | DeleteNodeAction
  | ReplaceNodeAction;

const InternalActions = {
  requestAllTrees(): TreeActionTypes {
    return {
      type: REQUEST_ALL_TREES
    };
  },

  receiveAllTrees(trees: ReadonlyArray<ITree>): TreeActionTypes {
    return {
      type: RECEIVE_ALL_TREES,
      payload: trees
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

  createLeaf(parentId: string, leaf: Leaf): TreeActionTypes {
    return {
      type: CREATE_LEAF,
      parentId: parentId,
      leaf: leaf
    };
  },

  updateNodeById(id: string, data: Data): TreeActionTypes {
    return {
      type: UPDATE_NODE,
      id: id,
      data: data
    };
  },

  deleteNodeById(id: string): TreeActionTypes {
    return {
      type: DELETE_NODE,
      id: id
    };
  },

  replaceNodeById(id: string, node: ITree): TreeActionTypes {
    return {
      type: REPLACE_NODE,
      id: id,
      node: node
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

export const createRootLeaf = (
  type: string
): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    const leaf = new Leaf(uuid(), Data.defaultWithType(type));
    dispatch(InternalActions.createLeaf('', leaf));

    const node = await TreeApi.createLeaf('', leaf.data);
    dispatch(InternalActions.replaceNodeById(leaf.id, node));
  };
};

export const createLeaf = (
  parentId: string
): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    const leaf = new Leaf(uuid(), Data.default());
    dispatch(InternalActions.createLeaf(parentId, leaf));

    const node = await TreeApi.createLeaf(parentId, leaf.data);
    dispatch(InternalActions.replaceNodeById(leaf.id, node));
  };
};

export const updateNode = (
  id: string,
  data: Data
): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.updateNodeById(id, data));

    const node = await TreeApi.updateTree(id, data);
    dispatch(InternalActions.replaceNodeById(node.id, node));
  };
};

export const deleteNode = (id: string): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.deleteNodeById(id));

    await TreeApi.deleteTree(id);
  };
};
