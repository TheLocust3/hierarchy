import { ITree, Data } from '../models/tree/tree-base';
import Leaf from '../models/tree/leaf';
import {
  TreeActionTypes,
  REQUEST_ALL_TREES,
  REQUEST_TREE,
  RECEIVE_ALL_TREES,
  RECEIVE_TREE,
  SET_OVERLAY,
  CREATE_LEAF,
  UPDATE_NODE,
  DELETE_NODE,
  REPLACE_NODE,
  REQUEST_TREE_AS_LIST,
  RECEIVE_TREE_AS_LIST
} from '../actions/tree-actions';

export interface TreeOverlay {
  id: string;
  open: boolean;
}

export interface TreeState {
  tree: ITree;
  trees: ReadonlyArray<ITree>;
  nodes: ReadonlyArray<Leaf>;
  isReady: boolean;
  overlay: TreeOverlay;
}

const defaultTreeState: TreeState = {
  tree: new Leaf('', Data.empty()),
  trees: [],
  nodes: [],
  isReady: false,
  overlay: { id: '', open: false }
};

export function treeReducer(
  state: TreeState = defaultTreeState,
  action: TreeActionTypes
): TreeState {
  switch (action.type) {
    case REQUEST_ALL_TREES:
    case REQUEST_TREE:
    case REQUEST_TREE_AS_LIST:
      return {
        ...state,
        isReady: false
      };
    case RECEIVE_ALL_TREES:
      return {
        ...state,
        trees: action.payload,
        isReady: true
      };
    case RECEIVE_TREE:
      return {
        ...state,
        tree: action.payload,
        isReady: true
      };
    case RECEIVE_TREE_AS_LIST:
      return {
        ...state,
        nodes: action.payload,
        isReady: true
      };
    case SET_OVERLAY:
      return {
        ...state,
        overlay: action.payload
      };
    case CREATE_LEAF:
      return {
        ...state,
        tree: state.tree.insertNodeByParentId(action.parentId, action.leaf)
      };
    case UPDATE_NODE:
      return {
        ...state,
        tree: state.tree.updateNodeById(action.id, action.data)
      };
    case DELETE_NODE:
      return {
        ...state,
        tree: state.tree.deleteNodeById(action.id)
      };
    case REPLACE_NODE:
      return {
        ...state,
        tree: state.tree.replaceNodeById(action.id, action.node)
      };
    default:
      return state;
  }
}
