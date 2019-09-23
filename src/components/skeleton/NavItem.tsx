import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';

import UnstyledLink from '../common/UnstyledLink';
import MaterialIcon from '../common/MaterialIcon';
import NavTooltip from './NavTooltip';

const ItemContainer = styled('div')`
  position: relative;

  width: 100%;
  height: 30px;

  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 17.5px;

  i {
    color: white;

    transition: color 250ms;
  }

  i:hover {
    color: ${colors.themeMain};
  }

  i:hover + div {
    visibility: visible;
    opacity: 1;
  }
`;

interface NavItemProps {
  text: string;
  tooltipWidth: string;
  to?: string;
  onClick?: () => void;
  icon: string;
}

class NavItem extends React.Component<NavItemProps> {
  render() {
    const { to } = this.props;

    if (to !== undefined) {
      return this.renderLink();
    }

    return this.renderOnClick();
  }

  renderLink() {
    const { text, tooltipWidth, to, icon } = this.props;

    if (to === undefined) return;

    return (
      <ItemContainer>
        <UnstyledLink to={to}>
          <MaterialIcon icon={icon} fontSize="35px" />

          <NavTooltip text={text} width={tooltipWidth} />
        </UnstyledLink>
      </ItemContainer>
    );
  }

  renderOnClick() {
    const { text, tooltipWidth, onClick, icon } = this.props;

    return (
      <ItemContainer>
        <div onClick={onClick} style={{ cursor: 'pointer' }}>
          <MaterialIcon icon={icon} fontSize="35px" />

          <NavTooltip text={text} width={tooltipWidth} />
        </div>
      </ItemContainer>
    );
  }
}

export default NavItem;
