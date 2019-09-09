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
  overlayOpen: boolean;
  specialTrees: ReadonlyArray<ITree>;
  setStatus: (oldStatusId: string, statusId: string) => void;
}

interface StatusSectionState {
  dropdownShown: boolean;
}

class StatusSection extends React.Component<StatusSectionProps, StatusSectionState> {
  constructor(props: StatusSectionProps) {
    super(props);

    this.state = { dropdownShown: false };
  }

  componentWillReceiveProps(nextProps: StatusSectionProps) {
    if (!nextProps.overlayOpen) {
      this.setState({ dropdownShown: false });
    }
  }

  render() {
    const { specialTrees, setStatus } = this.props;

    const status = this.props.specialTrees.find(
      (tree: ITree) => tree.data.type === 'status' && tree.containsITree(this.props.id)
    );

    return (
      <SideMargin margin="5%">
        <LabelsHeader>
          Status
          <AddButtonContainer>
            <AddButton
              onClick={() => this.setState({ dropdownShown: !this.state.dropdownShown })}
            />
          </AddButtonContainer>
          <LabelDropdown
            labels={this.props.specialTrees
              .filter((tree: ITree) => tree.data.type === 'status')
              .map((tree: ITree) => {
                return { id: tree.id, name: tree.data.title };
              })}
            isVisible={this.state.dropdownShown}
            onSelect={(id: string) => {
              setStatus(status === undefined ? '' : status.id, id);
              this.setState({ dropdownShown: false });
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
