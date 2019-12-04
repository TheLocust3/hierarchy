import _ from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppState, Dispatch } from '../types';
import { getUser } from '../actions/user-actions';
import User from '../models/user/user';

import SignIn from '../containers/user/SignIn';
import AppRoutes from './AppRoutes';

interface RootRoutesProps {
  user: User;
  isReady: boolean;
  dispatch: Dispatch;
}

class RootRoutes extends React.Component<RootRoutesProps> {
  componentDidMount() {
    this.props.dispatch(getUser());
  }

  render() {
    const { user, isReady } = this.props;

    if (!isReady) return null;

    if (isReady && _.isEmpty(user)) return <SignIn />;

    return (
      <Switch>
        <Route exact path="/sign_in" component={SignIn} />

        <Route component={AppRoutes} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isReady: state.user.isReady
});

export default connect(mapStateToProps)(RootRoutes);
