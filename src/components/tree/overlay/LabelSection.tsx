import React from 'react';
import styled from '@emotion/styled';

import { ITree } from '../../../models/tree/tree-base';

import Spacer from '../../common/Spacer';
import SideMargin from '../../common/SideMargin';
import AddButton from '../AddButton';
import LabelDropdown from './LabelDropdown';
import Label from './Label';

const LabelsHeader = styled('div')`
  width: 70px;
  position: relative;
`;

const AddButtonContainer = styled('div')`
  position: absolute;
  top: -1px;
  right: 0;
`;

const LabelContainer = styled('span')`
  margin-left: 5px;
  margin-right: 5px;
`;

interface LabelSectionProps {
  id: string;
  dropdownShown: boolean;
  dropdownToggle: () => void;
  dropdownHide: () => void;
  specialTrees: ReadonlyArray<ITree>;
  addLabel: (labelId: string) => void;
  deleteLabel: (labelId: string) => void;
}

class LabelSection extends React.Component<LabelSectionProps> {
  render() {
    const { dropdownShown, dropdownToggle, dropdownHide, addLabel } = this.props;

    return (
      <SideMargin margin="5%">
        <LabelsHeader>
          Labels
          <AddButtonContainer>
            <AddButton onClick={dropdownToggle} />
          </AddButtonContainer>
          <LabelDropdown
            labels={this.props.specialTrees
              .filter((tree: ITree) => tree.data.type === 'label')
              .map((tree: ITree) => {
                return { id: tree.id, name: tree.data.title };
              })}
            isVisible={dropdownShown}
            onSelect={(id: string) => {
              addLabel(id);
              dropdownHide();
            }}
          />
        </LabelsHeader>
        <Spacer space="2%" />

        {this.renderLabels()}
      </SideMargin>
    );
  }

  private renderLabels() {
    const labels = this.props.specialTrees.filter(
      (tree: ITree) => tree.containsITree(this.props.id) && tree.data.type === 'label'
    );
    if (labels.length === 0) return <SideMargin margin="2.5%">None</SideMargin>;

    return (
      <SideMargin margin="2.5%">
        {labels.map((labelTree: ITree) => {
          return (
            <LabelContainer key={labelTree.id}>
              <Label labelTree={labelTree} onClick={() => this.props.deleteLabel(labelTree.id)} />
            </LabelContainer>
          );
        })}
      </SideMargin>
    );
  }
}

export default LabelSection;
