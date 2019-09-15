import { DataJSON } from './tree-json';
import Label from '../label';
import Status from '../status';

export interface CardJSON {
  id: string;
  data: DataJSON;
  createdAt: number;
  labels: ReadonlyArray<Label>;
  status?: Status;
}

export interface ColumnJSON {
  id: string;
  name: string;
  cards: ReadonlyArray<CardJSON>;
  createdAt: number;
}

export interface ListResponse {
  columns: ReadonlyArray<ColumnJSON>;
}
