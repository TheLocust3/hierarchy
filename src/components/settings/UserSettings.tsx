import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import User from '../../models/user/user';

import TextField from '../common/TextField';
import Spacer from '../common/Spacer';
import Button from '../common/Button';
import SideMargin from '../common/SideMargin';

const InputContainer = styled('div')`
  display: flex;

  width: 100%;
`;

const TextFieldContainer = styled('span')`
  margin-top: -5px;

  width: 100%;
`;

const Label = styled('span')`
  font-size: 16px;
  margin-right: 1%;

  width: 100%;
`;

const ButtonContainer = styled('div')`
  float: right;
`;

interface UserSettingsState {
  oldEmail: string;
  email: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

interface UserSettingsProps {
  user: User;
  changePassword: (newPassword: string, newPasswordConfirmation: string) => void;
  updateUser: (email: string) => void;
}

class UserSettings extends React.Component<UserSettingsProps, UserSettingsState> {
  constructor(props: UserSettingsProps) {
    super(props);

    this.state = {
      oldEmail: this.props.user.email,
      email: this.props.user.email,
      newPassword: '',
      newPasswordConfirmation: ''
    };
  }

  onSave() {
    if (this.state.email !== this.state.oldEmail) {
      this.props.updateUser(this.state.email);
    }

    if (
      this.state.newPassword !== undefined &&
      this.state.newPassword !== null &&
      this.state.newPassword !== '' &&
      this.state.newPasswordConfirmation !== undefined &&
      this.state.newPasswordConfirmation !== null &&
      this.state.newPasswordConfirmation !== ''
    ) {
      this.props.changePassword(this.state.newPassword, this.state.newPasswordConfirmation);
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h3>User</h3>
        <Spacer space="2%" />

        <SideMargin marginLeft="1%" marginRight="40%">
          <InputContainer>
            <Label>Email:</Label>

            <TextFieldContainer>
              <TextField
                defaultValue={user.email}
                onChange={(event) => this.setState({ email: event.target.value })}
              />
            </TextFieldContainer>
          </InputContainer>

          <Spacer space="8%" />

          <InputContainer>
            <Label>New Password:</Label>

            <TextFieldContainer>
              <TextField
                type="password"
                onChange={(event) => this.setState({ newPassword: event.target.value })}
              />
            </TextFieldContainer>
          </InputContainer>

          <Spacer space="4%" />

          <InputContainer>
            <Label>New Password Confirmation:</Label>

            <TextFieldContainer>
              <TextField
                type="password"
                onChange={(event) => this.setState({ newPasswordConfirmation: event.target.value })}
              />
            </TextFieldContainer>
          </InputContainer>
        </SideMargin>

        <Spacer space="3%" />

        <ButtonContainer>
          <Button
            color={colors.themeMain}
            hoverColor={colors.themeMainHover}
            activeColor={colors.themeMainActive}
            textColor="white"
            width="70px"
            height="40px"
            onClick={() => this.onSave()}>
            Save
          </Button>
        </ButtonContainer>
      </div>
    );
  }
}

export default UserSettings;
