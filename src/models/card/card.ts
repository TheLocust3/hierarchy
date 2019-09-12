import moment from 'moment';

import { Data, ITree } from '../tree/tree-base';
import { CardJSON } from '../json/list-json';
import Leaf from '../tree/leaf';

export default class Card {
  private _id: string = '';
  private _data: Data = Data.empty();
  private _createdAt: number = moment().valueOf();

  static fromJSON(json: CardJSON) {
    return new Card(json.id, Data.fromJSON(json.data), json.createdAt);
  }

  static fromITree(tree: ITree) {
    return new Card(tree.id, tree.data, tree.createdAt);
  }

  constructor(id: string, data: Data, createdAt: number) {
    this._id = id;
    this._data = data;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  get data() {
    return this._data;
  }

  get createdAt() {
    return this._createdAt;
  }
}
