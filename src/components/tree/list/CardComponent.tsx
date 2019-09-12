import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';
import Card from '../../../models/card/card';
import { ITree } from '../../../models/tree/tree-base';

import Label from '../overlay/Label';
import SideMargin from '../../common/SideMargin';
import Spacer from '../../common/Spacer';

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

const CardHeader = styled('h4')``;

interface CardProps {
  card: Card;
  labels: ReadonlyArray<ITree>;
}

class CardComponent extends React.Component<CardProps> {
  render() {
    const { card, labels } = this.props;

    return (
      <CardContainer>
        {labels.map((labelTree: ITree) => {
          return (
            <div key={labelTree.id}>
              <Label labelTree={labelTree} />
            </div>
          );
        })}
        <Spacer space="1%" />

        <SideMargin margin="3%">
          <CardHeader>{card.data.title}</CardHeader>
        </SideMargin>
      </CardContainer>
    );
  }
}

export default CardComponent;
