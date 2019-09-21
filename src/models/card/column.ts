import moment from 'moment';

import { Node } from '../tree/tree-base';
import Label from '../label';
import Status from '../status';
import Card from './card';
import { CardJSON, ColumnJSON } from '../json/list-json';

export default class Column {
  private _id: string = '';
  private _name: string = '';
  private _color?: string = '';
  private _cards: ReadonlyArray<Card> = [];
  private _createdAt: number = moment().valueOf();

  static fromJSON(json: ColumnJSON) {
    return new Column(
      json.id,
      json.name,
      json.cards.map((cardJSON: CardJSON) => Card.fromJSON(cardJSON)),
      json.createdAt,
      json.color
    );
  }

  constructor(
    id: string,
    name: string,
    cards: ReadonlyArray<Card>,
    createdAt: number,
    color?: string
  ) {
    this._id = id;
    this._name = name;
    this._cards = cards;
    this._createdAt = createdAt;
    this._color = color;
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

  get color() {
    return this._color;
  }

  getCardById(id: string): Card | undefined {
    return this.cards.find((card: Card) => card.id === id);
  }

  addCard(card: Card): Column {
    return new Column(this.id, this.name, this.cards.concat(card), this.createdAt, this.color);
  }

  replaceCardNodeById(id: string, node: Node): Column {
    return new Column(
      this.id,
      this.name,
      this.cards.map((c: Card) => (c.id === id ? new Card(node, c.labels, c.status) : c)),
      this.createdAt,
      this.color
    );
  }

  deleteCardById(id: string): Column {
    return new Column(
      this.id,
      this.name,
      this.cards.filter((card) => card.id !== id),
      this.createdAt,
      this.color
    );
  }

  addLabelToCard(label: Label, cardId: string): Column {
    return new Column(
      this.id,
      this.name,
      this.cards.map((card) => (card.id === cardId ? card.addLabel(label) : card)),
      this.createdAt,
      this.color
    );
  }

  setCardStatus(status: Status, cardId: string): Column {
    return new Column(
      this.id,
      this.name,
      this.cards.map((card) => (card.id === cardId ? card.setStatus(status) : card)),
      this.createdAt,
      this.color
    );
  }

  deleteRelationship(parentId: string, cardId: string): Column {
    if (this.id === parentId) {
      return this.deleteCardById(cardId);
    }

    return new Column(
      this.id,
      this.name,
      this.cards.map((card) => (card.id === cardId ? card.removeLabel(parentId) : card)),
      this.createdAt,
      this.color
    );
  }
}
