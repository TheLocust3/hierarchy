/** @jsx jsx  */

import React from 'react';
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
      <a
        href={to}
        css={css`
          color: ${colors.black};
          text-decoration: none;

          &:hover {
            color: ${colors.black};
          }
        `}>
        {children}
      </a>
    );
  }
}

export default UnstyledLink;
