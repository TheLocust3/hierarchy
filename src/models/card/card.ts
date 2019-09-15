import { Data, Node } from '../tree/tree-base';
import Label from '../label';
import Status from '../status';
import { CardJSON } from '../json/list-json';

export default class Card {
  private _node: Node = Node.empty();
  private _labels: ReadonlyArray<Label> = [];
  private _status?: Status;

  static fromJSON(json: CardJSON) {
    return new Card(
      new Node(json.id, Data.fromJSON(json.data), json.createdAt),
      json.labels,
      json.status
    );
  }

  static empty() {
    return new Card(Node.empty(), []);
  }

  constructor(node: Node, labels: ReadonlyArray<Label>, status?: Status) {
    this._node = node;
    this._labels = labels;
    this._status = status;
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

  get labels() {
    return this._labels;
  }

  get status() {
    return this._status;
  }

  addLabel(label: Label): Card {
    return new Card(this._node, this.labels.concat(label), this.status);
  }

  setStatus(status: Status): Card {
    return new Card(this._node, this.labels, status);
  }

  removeLabel(labelId: string): Card {
    return new Card(this._node, this.labels.filter((l) => l.id !== labelId), this.status);
  }
}
