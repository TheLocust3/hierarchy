import React from 'react';
import styled from '@emotion/styled';

import Status from '../../../models/status';

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
  allStatuses: ReadonlyArray<Status>;
  status: Status | undefined;
  dropdownShown: boolean;
  dropdownToggle: () => void;
  dropdownHide: () => void;
  setStatus: (oldStatusId: string, statusId: string) => void;
}

class StatusSection extends React.Component<StatusSectionProps> {
  render() {
    const {
      allStatuses,
      status,
      dropdownShown,
      dropdownToggle,
      dropdownHide,
      setStatus
    } = this.props;

    return (
      <SideMargin margin="5%">
        <LabelsHeader>
          Status
          <AddButtonContainer>
            <AddButton onClick={dropdownToggle} />
          </AddButtonContainer>
          <LabelDropdown
            labels={allStatuses
              .slice()
              .sort((status1: Status, status2: Status) => status1.createdAt - status2.createdAt)
              .map((status: Status) => {
                return { id: status.id, title: status.title, createdAt: status.createdAt }; // TODO: I feel bad about this
              })}
            isVisible={dropdownShown}
            onSelect={(id: string) => {
              setStatus(status === undefined ? '' : status.id, id);
              dropdownHide();
            }}
          />
        </LabelsHeader>

        <Spacer space="1%" />

        <SideMargin margin="2.5%">{status === undefined ? 'N/A' : status.title}</SideMargin>
      </SideMargin>
    );
  }
}

export default StatusSection;
