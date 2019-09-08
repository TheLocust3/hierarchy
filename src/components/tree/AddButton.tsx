import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';

import Button from '../common/Button';
import MaterialIcon from '../common/MaterialIcon';

const ButtonInner = styled('div')`
  padding-top: 3px;
`;

interface AddButtonProps {
  onClick: () => void;
}

class AddButton extends React.Component<AddButtonProps> {
  render() {
    const { onClick } = this.props;

    return (
      <Button
        color={colors.addGreen}
        hoverColor={colors.addGreenHover}
        activeColor={colors.addGreenActive}
        textColor="white"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClick();
        }}
        width="18px"
        height="18px">
        <ButtonInner>
          <MaterialIcon icon="add" fontSize="18px" />
        </ButtonInner>
      </Button>
    );
  }
}

export default AddButton;
