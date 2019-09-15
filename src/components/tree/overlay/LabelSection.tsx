import React from 'react';
import styled from '@emotion/styled';

import LabelModel from '../../../models/label';

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
  allLabels: ReadonlyArray<LabelModel>;
  labels: ReadonlyArray<LabelModel>;
  dropdownShown: boolean;
  dropdownToggle: () => void;
  dropdownHide: () => void;
  addLabel: (labelId: string) => void;
  deleteLabel: (labelId: string) => void;
}

class LabelSection extends React.Component<LabelSectionProps> {
  render() {
    const { allLabels, dropdownShown, dropdownToggle, dropdownHide, addLabel } = this.props;

    return (
      <SideMargin margin="5%">
        <LabelsHeader>
          Labels
          <AddButtonContainer>
            <AddButton onClick={dropdownToggle} />
          </AddButtonContainer>
          <LabelDropdown
            labels={allLabels}
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
    const labels = this.props.labels;
    if (labels.length === 0) return <SideMargin margin="2.5%">None</SideMargin>;

    return (
      <SideMargin margin="2.5%">
        {labels.map((label: LabelModel) => {
          return (
            <LabelContainer key={label.id}>
              <Label label={label} onClick={() => this.props.deleteLabel(label.id)} />
            </LabelContainer>
          );
        })}
      </SideMargin>
    );
  }
}

export default LabelSection;
