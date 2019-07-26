import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../constants';

class Index extends React.Component<{}> {
  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE} - Index</title>
          <meta name="description" content="Index" />
        </Helmet>

        <div>
          <h1>Index</h1>
        </div>
      </div>
    );
  }
}

export default connect()(Index);
