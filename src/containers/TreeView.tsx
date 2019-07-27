import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../constants';

import TreeComponent from '../components/tree/TreeComponent';
import Tree from '../components/tree/Tree';
import Leaf from '../components/tree/Leaf';

class TreeView extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE} - Tree View</title>
          <meta name="description" content="Tree View" />
        </Helmet>

        <div>
          <h1>Tree View</h1>

          <TreeComponent
            data={{ title: 'root', body: 'body' }}
            nodes={[
              new Tree({ title: 'tree 1', body: 'body' }, [
                new Leaf({ title: 'leaf 1', body: 'body' }),
                new Leaf({ title: 'leaf 2', body: 'body' })
              ]),
              new Tree({ title: 'tree 2', body: 'body' }, [
                new Tree({ title: 'tree 4', body: 'body' }, [
                  new Leaf({ title: 'leaf 5', body: 'body' })
                ]),
                new Leaf({ title: 'leaf 3', body: 'body' }),
                new Leaf({ title: 'leaf 4', body: 'body' }),
                new Tree({ title: 'tree 6', body: 'body' }, [
                  new Leaf({ title: 'leaf 6', body: 'body' }),
                  new Leaf({ title: 'leaf 7', body: 'body' }),
                  new Leaf({ title: 'leaf 7', body: 'body' }),
                  new Leaf({ title: 'leaf 7', body: 'body' }),
                  new Leaf({ title: 'leaf 7', body: 'body' }),
                  new Leaf({ title: 'leaf 7', body: 'body' })
                ])
              ])
            ]}
          />
        </div>
      </div>
    );
  }
}

export default connect()(TreeView);
