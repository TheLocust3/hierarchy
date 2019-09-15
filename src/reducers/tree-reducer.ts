import { ITree, Node } from '../models/tree/tree-base';
import Leaf from '../models/tree/leaf';
import {
  TreeActionTypes,
  REQUEST_ALL_TREES,
  REQUEST_TREE,
  RECEIVE_ALL_TREES,
  RECEIVE_TREE,
  SET_OVERLAY,
  CREATE_LEAF,
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
  labels: ReadonlyArray<Node>;
  statuses: ReadonlyArray<Node>;
  isReady: boolean;
  overlay: TreeOverlay;
}

const defaultTreeState: TreeState = {
  tree: new Leaf(Node.empty()),
  nodes: [],
  labels: [],
  statuses: [],
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
      return {
        ...state,
        isReady: false
      };
    case RECEIVE_ALL_TREES:
      const allNodes = action.payload
        .slice()
        .sort((tree1: Node, tree2: Node) => tree1.createdAt - tree2.createdAt);

      return {
        ...state,
        nodes: allNodes.filter((node) => node.data.type === 'card'),
        labels: allNodes.filter((node) => node.data.type === 'label'),
        statuses: allNodes.filter((node) => node.data.type === 'status'),
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
      const parentTree = state.tree.findParentById(action.parentId);
      const parentNode = state.labels
        .concat(state.statuses)
        .find((node) => node.id === action.parentId);
      let parent: ITree = new Leaf(Node.empty());
      if (parentTree !== undefined) {
        parent = parentTree;
      } else if (parentNode !== undefined) {
        parent = new Leaf(parentNode);
      } else {
        return state;
      }

      return {
        ...state,
        tree: state.tree.addParentRelationship(parent, action.childId)
      };
    case DELETE_RELATIONSHIP:
      return {
        ...state,
        tree: state.tree.deleteParentRelationship(action.parentId, action.childId)
      };
    default:
      return state;
  }
}
