import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';

import TextField from '../common/TextField';
import Spacer from '../common/Spacer';
import Button from '../common/Button';
import SideMargin from '../common/SideMargin';

const InputContainer = styled('div')`
  width: 97%;
`;

const Label = styled('span')`
  font-size: 18px;
`;

const ButtonContainer = styled('div')`
  float: right;
`;

interface SignInFormProps {
  error: string;
  signIn: (email: string, password: string) => void;
}

interface SignInFormState {
  email: string;
  password: string;
}

class SignInForm extends React.Component<SignInFormProps, SignInFormState> {
  constructor(props: SignInFormProps) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmit(event: any): void {
    event.preventDefault();

    this.props.signIn(this.state.email, this.state.password);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <SideMargin marginLeft="5%" marginRight="0%">
          <InputContainer>
            <Label>Email:</Label>
            <Spacer space="1%" />

            <TextField
              type="email"
              height="20px"
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </InputContainer>

          <Spacer space="8%" />

          <InputContainer>
            <Label>Password:</Label>
            <Spacer space="1%" />

            <TextField
              type="password"
              height="20px"
              onChange={(event) => this.setState({ password: event.target.value })}
            />
          </InputContainer>

          <Spacer space="3%" />

          <p>{this.props.error}</p>

          <Spacer space="3%" />

          <input type="submit" style={{ position: 'absolute', left: '-9999px' }} />

          <ButtonContainer>
            <Button
              color={colors.themeMain}
              hoverColor={colors.themeMainHover}
              activeColor={colors.themeMainActive}
              textColor="white"
              width="70px"
              height="40px"
              onClick={(event: any) => this.onSubmit(event)}>
              Sign In
            </Button>
          </ButtonContainer>
        </SideMargin>
      </form>
    );
  }
}

export default SignInForm;
