import Card from './card';
import { CardJSON, ColumnJSON } from '../json/list-json';

export default class Column {
  private _id: string = '';
  private _name: string = '';
  private _cards: ReadonlyArray<Card> = [];

  static fromJSON(json: ColumnJSON) {
    return new Column(
      json.id,
      json.name,
      json.cards.map((cardJSON: CardJSON) => Card.fromJSON(cardJSON))
    );
  }

  constructor(id: string, name: string, cards: ReadonlyArray<Card>) {
    this._id = id;
    this._name = name;
    this._cards = cards;
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
}
