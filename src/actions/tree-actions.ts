import { ThunkAction } from 'redux-thunk';

import { AppState } from '../types';
import { TreeOverlay } from '../reducers/tree-reducer';
import { ITree, Data } from '../models/tree/tree-base';
import TreeApi from '../api/tree-api';

export const REQUEST_ALL_TREES = 'REQUEST_ALL_TREES';
export const RECEIVE_ALL_TREES = 'RECEIVE_ALL_TREES';

export const REQUEST_TREE = 'REQUEST_TREE';
export const RECEIVE_TREE = 'RECEIVE_TREE';

export const SET_OVERLAY = 'SET_OVERLAY';

export const SET_NODE = 'SET_NODE';
export const DELETE_NODE = 'DELETE_NODE';

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

interface SetNodeAction {
  type: typeof SET_NODE;
  id: string;
  payload: Data;
}

interface DeleteNodeAction {
  type: typeof DELETE_NODE;
  id: string;
}

export type TreeActionTypes =
  | RequestAllTreesAction
  | ReceiveAllTreesAction
  | RequestTreeAction
  | ReceiveTreeAction
  | SetOverlayAction
  | SetNodeAction
  | DeleteNodeAction;

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

  setNodeById(id: string, data: Data): TreeActionTypes {
    return {
      type: SET_NODE,
      id: id,
      payload: data
    };
  },

  deleteNodeById(id: string): TreeActionTypes {
    return {
      type: DELETE_NODE,
      id: id
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

export function getTree(id: String): ThunkAction<void, AppState, null, TreeActionTypes> {
  return async (dispatch) => {
    dispatch(InternalActions.requestTree());

    const tree = await TreeApi.getTree(id);
    dispatch(InternalActions.receiveTree(tree));
  };
}

export const updateNode = (
  id: string,
  data: Data
): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.setNodeById(id, data));

    TreeApi.updateTree(id, data).then((success) => {
      console.log(success);
    });
  };
};

export const deleteNode = (id: string): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.deleteNodeById(id));

    TreeApi.deleteTree(id).then((success) => {
      console.log(success);
    });
  };
};
