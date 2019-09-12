import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';
import Card from '../../../models/card/card';

const CardContainer = styled('div')`
  width: 250px;
  height: 150px;

  margin-top: 10px;
  margin-left: 15px;
  margin-bottom: 10px;

  padding: 10px;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  background-color: white;
`;

interface CardProps {
  card: Card;
}

class CardComponent extends React.Component<CardProps> {
  render() {
    const { card } = this.props;

    return <CardContainer>{card.data.title}</CardContainer>;
  }
}

export default CardComponent;
