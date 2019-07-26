import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../constants';

import TreeComponent from '../components/tree/TreeComponent';
import Tree from '../components/tree/Tree';
import Node from '../components/tree/Node';

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
            data={{ data: 'root' }}
            nodes={[
              new Tree({ data: 'tree 1' }, [
                new Node({ data: 'node 1' }),
                new Tree({ data: 'tree middle' }, [
                  new Node({ data: 'node 2' }),
                  new Node({ data: 'node 3' })
                ]),
                new Node({ data: 'node 4' })
              ]),
              new Tree({ data: 'tree 2' }, [
                new Node({ data: 'node 5' }),
                new Node({ data: 'node 6' })
              ])
            ]}
          />
        </div>
      </div>
    );
  }
}

export default connect()(TreeView);
