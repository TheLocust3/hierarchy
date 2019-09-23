import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { AppState, Dispatch } from '../types';
import { colors } from '../constants';
import { getUser } from '../actions/user-actions';
import User from '../models/user/user';

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
  user: User;
  isReady: boolean;
  dispatch: Dispatch;
}

class Skeleton extends React.Component<SkeletonProps> {
  componentDidMount() {
    this.props.dispatch(getUser());
  }

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

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isReady: state.user.isReady
});

export default connect(mapStateToProps)(Skeleton);
