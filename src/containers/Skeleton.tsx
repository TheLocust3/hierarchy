import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { colors } from '../constants';

import Navigation from '../components/skeleton/Navigation';

const SkeletonContainer = styled('div')`
  height: 100%;
`;

const Content = styled('div')`
  height: 100%;

  padding-left: 70px;
`;

const LeftColumn = styled('div')`
  position: fixed;
  top: 0;
  left: 0;

  width: 70px;
  height: 100%;

  z-index: 100;

  box-shadow: 2px 0 5px ${colors.actionShadow};
`;

const RealContent = styled('div')`
  padding: 10px;
`;

interface SkeletonProps {
  children: any;
}

class Skeleton extends React.Component<SkeletonProps> {
  render() {
    const { children } = this.props;

    return (
      <SkeletonContainer>
        <LeftColumn>
          <Navigation />
        </LeftColumn>

        <Content>
          <RealContent>{children}</RealContent>
        </Content>
      </SkeletonContainer>
    );
  }
}

export default connect()(Skeleton);
