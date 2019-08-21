import { ITree } from '../models/tree/tree-base';
import Leaf from '../models/tree/leaf';
import { TreeActionTypes } from '../actions/tree-actions';

export interface TreeOverlay {
  id: string;
  open: boolean;
}

export interface TreeState {
  tree: ITree;
  trees: ReadonlyArray<ITree>;
  isReady: boolean;
  overlay: TreeOverlay;
}

const defaultTreeState: TreeState = {
  tree: new Leaf('', { title: '', body: '' }),
  trees: [],
  isReady: false,
  overlay: { id: '', open: false }
};

export function treeReducer(
  state: TreeState = defaultTreeState,
  action: TreeActionTypes
): TreeState {
  switch (action.type) {
    case 'REQUEST_ALL_TREES':
    case 'REQUEST_TREE':
      return {
        ...state,
        isReady: false
      };
    case 'RECEIVE_ALL_TREES':
      return {
        ...state,
        trees: action.payload,
        isReady: true
      };
    case 'RECEIVE_TREE':
      return {
        ...state,
        tree: action.payload,
        isReady: true
      };
    case 'SET_OVERLAY':
      return {
        ...state,
        overlay: action.payload
      };
    case 'SET_NODE':
      return {
        ...state,
        tree: state.tree.updateNodeById(action.id, action.payload)
      };
    case 'DELETE_NODE':
      return {
        ...state,
        tree: state.tree.deleteNodeById(action.id)
      };
    default:
      return state;
  }
}
