import moment from 'moment';

import Card from './card';
import { CardJSON, ColumnJSON } from '../json/list-json';

export default class Column {
  private _id: string = '';
  private _name: string = '';
  private _cards: ReadonlyArray<Card> = [];
  private _createdAt: number = moment().valueOf();

  static fromJSON(json: ColumnJSON) {
    return new Column(
      json.id,
      json.name,
      json.cards.map((cardJSON: CardJSON) => Card.fromJSON(cardJSON)),
      json.createdAt
    );
  }

  constructor(id: string, name: string, cards: ReadonlyArray<Card>, createdAt: number) {
    this._id = id;
    this._name = name;
    this._cards = cards;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get cards() {
    return this._cards;
  }

  get createdAt() {
    return this._createdAt;
  }
}
