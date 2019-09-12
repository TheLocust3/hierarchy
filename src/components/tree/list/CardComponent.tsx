import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';
import Card from '../../../models/card/card';
import { ITree, Data } from '../../../models/tree/tree-base';
import { TreeOverlay } from '../../../reducers/tree-reducer';

import Label from '../overlay/Label';
import SideMargin from '../../common/SideMargin';
import Spacer from '../../common/Spacer';
import NodeOverlay from '../overlay/NodeOverlay';

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

const CardInner = styled('div')`
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const CardHeader = styled('h4')``;

interface CardProps {
  card: Card;
  labels: ReadonlyArray<ITree>;
  specialTrees: ReadonlyArray<ITree>;
  overlay: TreeOverlay;
  onClick: (event: any) => void;
  setOverlay: (overlay: TreeOverlay) => void;
  updateNode: (id: string, data: Data) => void;
  deleteNode: (id: string) => void;
  createRelationship: (parentId: string, childId: string) => void;
  deleteRelationship: (parentId: string, childId: string) => void;
}

class CardComponent extends React.Component<CardProps> {
  componentDidMount() {
    window.addEventListener('click', () => {
      // TOOD: bind this only when id is selected
      if (this.props.overlay.id === this.props.card.id && this.props.overlay.open) {
        this.props.setOverlay({ id: this.props.card.id, open: false });
      }
    });
  }

  render() {
    const { card, labels, specialTrees, overlay, onClick } = this.props;
    const id = card.id;

    return (
      <CardContainer onClick={onClick}>
        <CardInner>
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
        </CardInner>

        <NodeOverlay
          id={id}
          data={card.data}
          specialTrees={specialTrees}
          currentOverlay={overlay}
          updateNode={(data: Data) => this.props.updateNode(id, data)}
          deleteNode={() => this.props.deleteNode(id)}
          addLabel={(labelId: string) => this.props.createRelationship(labelId, id)}
          deleteLabel={(labelId: string) => this.props.deleteRelationship(labelId, id)}
          setStatus={(oldStatusId: string, statusId: string) => {
            if (oldStatusId !== '') {
              this.props.deleteRelationship(oldStatusId, id);
            }

            this.props.createRelationship(statusId, id);
          }}
        />
      </CardContainer>
    );
  }
}

export default CardComponent;
