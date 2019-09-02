import { Data } from '../tree/tree-base';
import { CardJSON } from '../json/list-json';

export default class Card {
  private _id: string = '';
  private _data: Data = Data.empty();

  static fromJSON(json: CardJSON) {
    return new Card(json.id, Data.fromJSON(json.data));
  }

  constructor(id: string, data: Data) {
    this._id = id;
    this._data = data;
  }

  get id() {
    return this._id;
  }

  get data() {
    return this._data;
  }
}
