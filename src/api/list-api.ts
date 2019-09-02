import { API_ENDPOINT } from '../constants';
import { ListResponse, ColumnJSON } from '../models/json/list-json';
import Column from '../models/card/column';

const ListApi = {
  async getListRootedAt(rootId: string): Promise<ReadonlyArray<Column>> {
    const response = await fetch(`${API_ENDPOINT}/list/${rootId}`, { method: 'GET' });
    const json: ListResponse = await response.json();

    return json.columns.map((json: ColumnJSON) => Column.fromJSON(json));
  }
};

export default ListApi;
