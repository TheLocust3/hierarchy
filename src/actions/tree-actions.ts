import { ThunkAction } from 'redux-thunk';

import { AppState } from '../types';
import { TreeOverlay } from '../reducers/tree-reducer';
import { ITree } from '../models/tree/tree-base';
import TreeApi from '../api/tree-api';

export const REQUEST_ALL_TREES = 'REQUEST_ALL_TREES';
export const RECEIVE_ALL_TREES = 'RECEIVE_ALL_TREES';

export const REQUEST_TREE = 'REQUEST_TREE';
export const RECEIVE_TREE = 'RECEIVE_TREE';

export const SET_OVERLAY = 'SET_OVERLAY';

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

interface SetOverlay {
  type: typeof SET_OVERLAY;
  payload: TreeOverlay;
}

export type TreeActionTypes =
  | RequestAllTreesAction
  | ReceiveAllTreesAction
  | RequestTreeAction
  | ReceiveTreeAction
  | SetOverlay;

function requestAllTrees(): TreeActionTypes {
  return {
    type: REQUEST_ALL_TREES
  };
}

function receiveAllTrees(trees: ReadonlyArray<ITree>): TreeActionTypes {
  return {
    type: RECEIVE_ALL_TREES,
    payload: trees
  };
}

function requestTree(): TreeActionTypes {
  return {
    type: REQUEST_TREE
  };
}

function receiveTree(tree: ITree): TreeActionTypes {
  return {
    type: RECEIVE_TREE,
    payload: tree
  };
}

export function setOverlay(overlay: TreeOverlay): TreeActionTypes {
  return {
    type: SET_OVERLAY,
    payload: overlay
  }
}

export const getAllTrees = (): ThunkAction<void, AppState, null, TreeActionTypes> => {
  return async (dispatch) => {
    dispatch(requestAllTrees());

    const trees = await TreeApi.getAllTrees();
    dispatch(receiveAllTrees(trees));
  };
};

export function getTree(uuid: String): ThunkAction<void, AppState, null, TreeActionTypes> {
  return async (dispatch) => {
    dispatch(requestTree());

    const tree = await TreeApi.getTree(uuid);
    dispatch(receiveTree(tree));
  };
}
