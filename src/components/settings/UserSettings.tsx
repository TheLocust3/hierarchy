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

interface UserSettingsProps {
  user: User;
}

class UserSettings extends React.Component<UserSettingsProps> {
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
              <TextField defaultValue={user.email} />
            </TextFieldContainer>
          </InputContainer>

          <Spacer space="4%" />

          <InputContainer>
            <Label>New Password:</Label>

            <TextFieldContainer>
              <TextField />
            </TextFieldContainer>
          </InputContainer>

          <Spacer space="4%" />

          <InputContainer>
            <Label>New Password Confirmation:</Label>

            <TextFieldContainer>
              <TextField />
            </TextFieldContainer>
          </InputContainer>
        </SideMargin>

        <Spacer space="1%" />

        <ButtonContainer>
          <Button
            color={colors.themeMain}
            hoverColor={colors.themeMainHover}
            activeColor={colors.themeMainActive}
            textColor="white"
            width="70px"
            height="40px"
            onClick={() => {}}>
            Save
          </Button>
        </ButtonContainer>
      </div>
    );
  }
}

export default UserSettings;
