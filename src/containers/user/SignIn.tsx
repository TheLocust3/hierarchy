import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../../constants';
import { AppState } from '../../types';
import { signIn } from '../../actions/user-actions';

import SideMargin from '../../components/common/SideMargin';
import Spacer from '../../components/common/Spacer';
import SignInForm from '../../components/user/SignInForm';

interface SignInProps {
  error: string;
  signIn: (email: string, password: string) => void;
}

class SignIn extends React.Component<SignInProps> {
  signIn(email: string, password: string): void {
    this.props.signIn(email, password);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE} - Sign In</title>
          <meta name="description" content="Sign In" />
        </Helmet>

        <SideMargin marginLeft="15%" marginRight="30%">
          <Spacer space="5%" />

          <h1>Sign In</h1>
          <Spacer space="8%" />

          <SignInForm
            signIn={(email: string, password: string) => this.signIn(email, password)}
            error={this.props.error}
          />
        </SideMargin>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  error: state.user.error
});

export default connect(mapStateToProps, { signIn })(SignIn);
