import { ITree, Data } from '../components/tree/tree-types';
import Leaf from '../components/tree/Leaf';
import Tree from '../components/tree/Tree';

export interface TreeApiStructure {
  getAllTrees(): Promise<ReadonlyArray<ITree>>;
  getTree(uuid: String): Promise<ITree>;
  createLeaf(data: Data, parentUuid: String): Promise<Boolean>;
  updateTree(uuid: String, data: Data): Promise<Boolean>;
  deleteTree(uuid: String): Promise<Boolean>;
}

const TreeApi: TreeApiStructure = {
  async getAllTrees(): Promise<ReadonlyArray<ITree>> {
    return [];
  },

  async getTree(uuid: String): Promise<ITree> {
    return new Tree(uuid, { title: 'root', body: 'body' }, [
      new Tree('', { title: 'tree 1', body: 'body' }, [
        new Leaf('', { title: 'leaf 1', body: 'body' }),
        new Leaf('', { title: 'leaf 2', body: 'body' })
      ]),
      new Tree('', { title: 'tree 2', body: 'body' }, [
        new Tree('', { title: 'tree 4', body: 'body' }, [
          new Leaf('', { title: 'leaf 5', body: 'body' }),
          new Leaf('', { title: 'leaf 5', body: 'body' })
        ]),
        new Leaf('', { title: 'leaf 3', body: 'body' }),
        new Leaf('', { title: 'leaf 4', body: 'body' }),
        new Tree('', { title: 'tree 6', body: 'body' }, [
          new Leaf('', { title: 'leaf 6', body: 'body' }),
          new Leaf('', { title: 'leaf 7', body: 'body' }),
          new Tree('', { title: 'tree 6', body: 'body' }, [
            new Leaf('', { title: 'leaf 7', body: 'body' }),
            new Leaf('', { title: 'leaf 7', body: 'body' })
          ]),
          new Leaf('', { title: 'leaf 7', body: 'body' }),
          new Leaf('', { title: 'leaf 7', body: 'body' }),
          new Leaf('', { title: 'leaf 7', body: 'body' }),
          new Leaf('', { title: 'leaf 7', body: 'body' })
        ])
      ]),
      new Tree('', { title: 'tree 6', body: 'body' }, [
        new Leaf('', { title: 'leaf 6', body: 'body' }),
        new Leaf('', { title: 'leaf 6', body: 'body' }),
        new Leaf('', { title: 'leaf 6', body: 'body' })
      ])
    ]);
  },

  async createLeaf(data: Data, parentUuid: String): Promise<Boolean> {
    return true;
  },

  async updateTree(uuid: String, data: Data): Promise<Boolean> {
    return true;
  },

  async deleteTree(uuid: String): Promise<Boolean> {
    return true;
  }
};

export default TreeApi;
