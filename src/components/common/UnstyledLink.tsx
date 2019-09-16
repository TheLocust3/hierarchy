/** @jsx jsx  */

import React from 'react';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';

import { colors } from '../../constants';

interface UnstyledLinkProps {
  to: string;
  children: any;
}

class UnstyledLink extends React.Component<UnstyledLinkProps> {
  render() {
    let { children, to } = this.props;

    return (
      <Link
        to={to}
        css={css`
          color: ${colors.black};
          text-decoration: none;

          &:hover {
            color: ${colors.black};
          }
        `}>
        {children}
      </Link>
    );
  }
}

export default UnstyledLink;
