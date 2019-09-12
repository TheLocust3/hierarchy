import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';
import Column from '../../../models/card/column';
import Card from '../../../models/card/card';
import { ITree } from '../../../models/tree/tree-base';

import CardComponent from './CardComponent';

const ColumnContainer = styled('div')`
  width: 300px;
  height: 87.5vh;

  margin-top: 10px;
  margin-bottom: 30px;
  margin-left: 7px;
  margin-right: 7px;

  padding: 10px;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  background-color: ${colors.nodeBackground};

  overflow: scroll;
`;

const ColumnTitle = styled('h3')``;

interface ListColumnProps {
  column: Column;
  specialTrees: ReadonlyArray<ITree>;
}

class ListColumn extends React.Component<ListColumnProps> {
  render() {
    const { column, specialTrees } = this.props;

    return (
      <ColumnContainer>
        <ColumnTitle>{column.name}</ColumnTitle>

        {column.cards.map((card: Card) => (
          <div key={card.id}>
            <CardComponent
              card={card}
              labels={specialTrees.filter(
                (tree: ITree) =>
                  tree.data.type === 'label' && tree.getNodeById(card.id) !== undefined
              )}
            />
          </div>
        ))}
      </ColumnContainer>
    );
  }
}

export default ListColumn;
