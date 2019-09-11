import { DataJSON } from './tree-json';

export interface CardJSON {
  id: string;
  data: DataJSON;
  createdAt: number;
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
