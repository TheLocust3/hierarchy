import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { AppState, Dispatch } from '../types';
import { TITLE } from '../constants';
import { getUser } from '../actions/user-actions';
import User from '../models/user/user';

import SideMargin from '../components/common/SideMargin';
import UserSettings from '../components/settings/UserSettings';

interface SettingsProps {
  user: User;
  isReady: boolean;
  dispatch: Dispatch;
}

class Settings extends React.Component<SettingsProps> {
  componentDidMount() {
    this.props.dispatch(getUser());
  }

  render() {
    const { user, isReady } = this.props;

    return (
      <div>
        <Helmet>
          <title>{TITLE} - Settings</title>
          <meta name="description" content="Settings" />
        </Helmet>

        <div>
          <h1>Settings</h1>
          <br />

          <SideMargin margin="2.5%">{isReady ? <UserSettings user={user} /> : <div />}</SideMargin>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isReady: state.user.isReady
});

export default connect(mapStateToProps)(Settings);
