import { DataJSON } from './tree-json';

export interface CardJSON {
  id: string;
  data: DataJSON;
}

export interface ColumnJSON {
  id: string;
  name: string;
  cards: ReadonlyArray<CardJSON>;
}

export interface ListResponse {
  columns: ReadonlyArray<ColumnJSON>;
}
