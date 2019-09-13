import React from 'react';
import styled from '@emotion/styled';

import { ITree } from '../../../models/tree/tree-base';

import SideMargin from '../../common/SideMargin';
import Spacer from '../../common/Spacer';
import AddButton from '../AddButton';
import LabelDropdown from './LabelDropdown';

const LabelsHeader = styled('div')`
  width: 70px;
  position: relative;
`;

const AddButtonContainer = styled('div')`
  position: absolute;
  top: -1px;
  right: 0;
`;

interface StatusSectionProps {
  id: string;
  dropdownShown: boolean;
  dropdownToggle: () => void;
  dropdownHide: () => void;
  specialTrees: ReadonlyArray<ITree>;
  setStatus: (oldStatusId: string, statusId: string) => void;
}

class StatusSection extends React.Component<StatusSectionProps> {
  render() {
    const { dropdownShown, dropdownToggle, dropdownHide, setStatus } = this.props;

    const status = this.props.specialTrees.find(
      (tree: ITree) => tree.data.type === 'status' && tree.containsITree(this.props.id)
    );

    return (
      <SideMargin margin="5%">
        <LabelsHeader>
          Status
          <AddButtonContainer>
            <AddButton onClick={dropdownToggle} />
          </AddButtonContainer>
          <LabelDropdown
            labels={this.props.specialTrees
              .filter((tree: ITree) => tree.data.type === 'status')
              .sort((tree1, tree2) => tree1.createdAt - tree2.createdAt)
              .map((tree: ITree) => {
                return { id: tree.id, name: tree.data.title };
              })}
            isVisible={dropdownShown}
            onSelect={(id: string) => {
              setStatus(status === undefined ? '' : status.id, id);
              dropdownHide();
            }}
          />
        </LabelsHeader>

        <Spacer space="1%" />

        <SideMargin margin="2.5%">{status === undefined ? 'N/A' : status.data.title}</SideMargin>
      </SideMargin>
    );
  }
}

export default StatusSection;
