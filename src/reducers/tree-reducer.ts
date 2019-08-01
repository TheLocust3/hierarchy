import { ITree } from '../models/tree/tree-base';
import Leaf from '../models/tree/Leaf';
import { TreeActionTypes } from '../actions/tree-actions';

interface TreeStore {
  tree: ITree;
  trees: ReadonlyArray<ITree>;
  isReady: boolean;
}

const defaultTreeStore: TreeStore = {
  tree: new Leaf('', { title: '', body: '' }),
  trees: [],
  isReady: false
};

export function treeReducer(
  state: TreeStore = defaultTreeStore,
  action: TreeActionTypes
): TreeStore {
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
    default:
      return state;
  }
}
