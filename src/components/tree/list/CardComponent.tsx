import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';

import { colors } from '../../../constants';
import Card from '../../../models/card/card';
import { Data } from '../../../models/tree/tree-base';
import LabelModel from '../../../models/label';
import Status from '../../../models/status';
import { TreeOverlay } from '../../../reducers/tree-reducer';

import Label from '../overlay/Label';
import SideMargin from '../../common/SideMargin';
import Spacer from '../../common/Spacer';
import NodeOverlay from '../overlay/NodeOverlay';

const CardContainer = styled('div')`
  position: relative;

  width: 250px;
  height: 150px;

  margin-top: 10px;
  margin-left: 15px;
  margin-bottom: 10px;

  padding: 10px;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  background-color: white;
  transition: background-color 250ms;

  box-shadow: 2px 2px 3px #ccc;

  overflow: hidden;

  &:hover span {
    -webkit-filter: brightness(95%);
  }
`;

interface BackgroundProps {
  backgroundColor?: string;
}

const Background = styled('span')<BackgroundProps>`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: ${(props: BackgroundProps) =>
    props.backgroundColor === undefined ? colors.nodeBackground : props.backgroundColor};

  filter: brightness(100%);
  -webkit-filter: brightness(100%);

  transition: background-color 0.25s, filter 0.25s;
`;

const CardInner = styled('div')`
  position: relative;

  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const CardBottom = styled('div')`
  position: absolute;
  bottom: 0;
`;

const CardHeader = styled('h4')``;

const LabelContainer = styled('span')`
  margin-right: 5px;
`;

const DueByContainer = styled('div')`
  border: 1px solid ${colors.black};
  border-radius: 5px;

  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
`;

interface CardProps {
  card: Card;
  onDragEnd: () => void;
  allLabels: ReadonlyArray<LabelModel>;
  allStatuses: ReadonlyArray<Status>;
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
    const { card, onDragEnd, allLabels, allStatuses, overlay, onClick } = this.props;
    const id = card.id;

    return (
      <CardContainer onClick={onClick} draggable={true} onDragEnd={() => onDragEnd()}>
        <Background backgroundColor={card.data.color} />

        <CardInner>
          {card.labels.map((label) => {
            return (
              <LabelContainer key={label.id}>
                <Label label={label} />
              </LabelContainer>
            );
          })}
          <Spacer space="1%" />

          <SideMargin margin="3%">
            <CardHeader>{card.data.title}</CardHeader>
          </SideMargin>

          {this.renderDueBy(card.data.dueOn)}
        </CardInner>

        <NodeOverlay
          id={id}
          color={card.data.color}
          data={card.data}
          allLabels={allLabels}
          labels={card.labels}
          allStatuses={allStatuses}
          status={card.status}
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

  private renderDueBy(dueBy?: number) {
    if (dueBy === undefined) return;

    return (
      <CardBottom>
        <DueByContainer>{moment(dueBy).format('MMM D')}</DueByContainer>
      </CardBottom>
    );
  }
}

export default CardComponent;
