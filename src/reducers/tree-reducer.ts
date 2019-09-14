import { ITree, Node } from '../models/tree/tree-base';
import Leaf from '../models/tree/leaf';
import {
  TreeActionTypes,
  REQUEST_ALL_TREES,
  REQUEST_ALL_SPECIAL_TREES,
  REQUEST_TREE,
  RECEIVE_ALL_TREES,
  RECEIVE_ALL_SPECIAL_TREES,
  RECEIVE_TREE,
  SET_OVERLAY,
  CREATE_LEAF,
  UPDATE_NODE,
  DELETE_NODE,
  REPLACE_NODE,
  CREATE_RELATIONSHIP,
  DELETE_RELATIONSHIP
} from '../actions/tree-actions';

export interface TreeOverlay {
  id: string;
  open: boolean;
}

export interface TreeState {
  tree: ITree;
  nodes: ReadonlyArray<Node>;
  specialTrees: ReadonlyArray<ITree>;
  isReady: boolean;
  overlay: TreeOverlay;
}

const defaultTreeState: TreeState = {
  tree: new Leaf(Node.empty()),
  nodes: [],
  specialTrees: [],
  isReady: false,
  overlay: { id: '', open: false }
};

export function treeReducer(
  state: TreeState = defaultTreeState,
  action: TreeActionTypes
): TreeState {
  switch (action.type) {
    case REQUEST_ALL_TREES:
    case REQUEST_ALL_SPECIAL_TREES:
    case REQUEST_TREE:
      return {
        ...state,
        isReady: false
      };
    case RECEIVE_ALL_TREES:
      return {
        ...state,
        nodes: action.payload
          .slice()
          .sort((tree1: Node, tree2: Node) => tree1.createdAt - tree2.createdAt),
        isReady: true
      };
    case RECEIVE_ALL_SPECIAL_TREES:
      return {
        ...state,
        specialTrees: action.payload,
        isReady: true
      };
    case RECEIVE_TREE:
      return {
        ...state,
        tree: action.payload,
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
        tree: state.tree.insertITreeByParentId(action.parentId, new Leaf(action.node))
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
    case CREATE_RELATIONSHIP:
      const childNode = state.tree.getNodeById(action.childId);
      if (childNode === undefined) return state;

      return {
        ...state,
        tree: state.tree.insertITreeByParentId(action.parentId, childNode),
        specialTrees: state.specialTrees.map((tree) =>
          tree.insertITreeByParentId(action.parentId, childNode)
        )
      };
    case DELETE_RELATIONSHIP:
      return {
        ...state,
        specialTrees: state.specialTrees.map((tree) =>
          tree.id === action.parentId ? tree.deleteNodeById(action.childId) : tree
        )
      };
    default:
      return state;
  }
}
