import { Data, Node } from '../tree/tree-base';
import { CardJSON } from '../json/list-json';

export default class Card {
  private _node: Node = Node.empty();

  static fromJSON(json: CardJSON) {
    return new Card(new Node(json.id, Data.fromJSON(json.data), json.createdAt));
  }

  constructor(node: Node) {
    this._node = node;
  }

  get id() {
    return this._node.id;
  }

  get data() {
    return this._node.data;
  }

  get createdAt() {
    return this._node.createdAt;
  }
}
