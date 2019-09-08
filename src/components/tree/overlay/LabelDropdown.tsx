import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

interface Label {
  id: string;
  name: string;
}

const DropdownContainer = styled('div')`
  position: absolute;
  top: 15px;
  right: -75px;

  padding: 0;

  border: 1px solid ${colors.black};
  border-radius: 4px;
  overflow: hidden;

  background-color: ${colors.nodeBackgroundHover};
`;

const DropdownItem = styled('div')`
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 15px;
  padding-left: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.dropdownHover};
  }
`;

interface LabelDropdownProps {
  labels: ReadonlyArray<Label>;
  isVisible: boolean;
  onSelect: (id: string) => void;
}

class LabelDropdown extends React.Component<LabelDropdownProps> {
  render() {
    const { labels, isVisible, onSelect } = this.props;

    return (
      <DropdownContainer style={{ display: isVisible ? 'initial' : 'none' }}>
        {labels.map((label) => (
          <DropdownItem
            key={label.id}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              onSelect(label.id);
            }}>
            {label.name}
          </DropdownItem>
        ))}
      </DropdownContainer>
    );
  }
}

export default LabelDropdown;
