import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../constants';

class NotFound extends React.Component<{}> {
  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE} - 404 Not Found</title>
          <meta name="description" content="404 Page not found" />
        </Helmet>

        <div>
          <h1>Page Not Found</h1>
        </div>
      </div>
    );
  }
}

export default connect()(NotFound);
