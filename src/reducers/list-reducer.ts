import moment from 'moment';

import {
  ListActionTypes,
  REQUEST_LIST_ROOTED_AT,
  RECEIVE_LIST_ROOTED_AT,
  ADD_LABEL,
  SET_STATUS
} from '../actions/list-actions';
import {
  TreeActionTypes,
  UPDATE_NODE,
  DELETE_NODE,
  REPLACE_NODE,
  DELETE_RELATIONSHIP
} from '../actions/tree-actions';
import { Node } from '../models/tree/tree-base';
import Column from '../models/card/column';
import Card from '../models/card/card';

export interface ListState {
  list: ReadonlyArray<Column>;
  cards: ReadonlyArray<Card>;
  isReady: boolean;
}

const defaultListState: ListState = {
  list: [],
  cards: [],
  isReady: false
};

export function listReducer(
  state: ListState = defaultListState,
  action: ListActionTypes | TreeActionTypes
): ListState {
  switch (action.type) {
    case REQUEST_LIST_ROOTED_AT:
      return {
        ...state,
        isReady: false
      };
    case RECEIVE_LIST_ROOTED_AT:
      return {
        ...state,
        list: action.payload
          .slice()
          .sort((col1: Column, col2: Column) => col1.createdAt - col2.createdAt),
        cards: action.payload.flatMap((column: Column) => column.cards),
        isReady: true
      };
    case UPDATE_NODE:
      const newCard = Card.empty();
      return {
        ...state,
        list: state.list.map((column: Column) =>
          column.replaceCardNodeById(
            action.id,
            new Node(action.id, action.data, moment().valueOf())
          )
        ),
        cards: state.cards.map((card: Card) => (card.id === action.id ? newCard : card))
      };
    case DELETE_NODE:
      return {
        ...state,
        list: state.list.map((column) => column.deleteCardById(action.id)),
        cards: state.cards.filter((card) => card.id !== action.id)
      };
    case REPLACE_NODE:
      return {
        ...state,
        list: state.list.map((column: Column) =>
          column.replaceCardNodeById(action.id, action.node)
        ),
        cards: state.cards.map((card) =>
          card.id === action.id ? new Card(action.node, card.labels, card.status) : card
        )
      };
    case ADD_LABEL:
      return {
        ...state,
        list: state.list.map((column: Column) => column.addLabelToCard(action.label, action.cardId))
      };
    case SET_STATUS:
      const card = state.cards.find((card) => card.id === action.cardId);
      if (card === undefined) return state;

      return {
        ...state,
        list: state.list.map((column: Column) =>
          column.id === action.status.id ? column.addCard(card) : column
        ),
        cards: state.cards.map((card) =>
          card.id === action.cardId ? card.setStatus(action.status) : card
        )
      };
    case DELETE_RELATIONSHIP:
      return {
        ...state,
        list: state.list.map((column: Column) =>
          column.deleteRelationship(action.parentId, action.childId)
        )
      };
    default:
      return state;
  }
}
