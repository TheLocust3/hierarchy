import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';
import Column from '../../../models/card/column';
import Card from '../../../models/card/card';
import { ITree, Data } from '../../../models/tree/tree-base';
import { TreeOverlay } from '../../../reducers/tree-reducer';

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
  overlay: TreeOverlay;
  setOverlay: (overlay: TreeOverlay) => void;
  updateNode: (id: string, data: Data) => void;
  deleteNode: (id: string) => void;
  createRelationship: (parentId: string, childId: string) => void;
  deleteRelationship: (parentId: string, childId: string) => void;
}

class ListColumn extends React.Component<ListColumnProps> {
  render() {
    const { column, specialTrees, overlay, setOverlay } = this.props;

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
              onClick={(event: any) => {
                if (!overlay.open) {
                  setOverlay({ id: card.id, open: true });
                  event.stopPropagation();
                }
              }}
              overlay={overlay}
              setOverlay={setOverlay}
              specialTrees={specialTrees}
              updateNode={this.props.updateNode}
              deleteNode={this.props.deleteNode}
              createRelationship={this.props.createRelationship}
              deleteRelationship={this.props.deleteRelationship}
            />
          </div>
        ))}
      </ColumnContainer>
    );
  }
}

export default ListColumn;
