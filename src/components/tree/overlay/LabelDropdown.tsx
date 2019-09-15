import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';
import Label from '../../../models/label';

const DropdownContainer = styled('div')`
  position: absolute;
  top: 15px;
  margin-left: 60px;

  padding: 0;

  border: 1px solid ${colors.black};
  border-radius: 4px;
  overflow: hidden;

  background-color: ${colors.nodeBackgroundHover};

  transition: visibility 200ms, opacity 200ms;

  z-index: 10;
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
      <DropdownContainer
        style={{ visibility: isVisible ? 'visible' : 'hidden', opacity: isVisible ? 1 : 0 }}>
        {labels.map((label) => (
          <DropdownItem
            key={label.id}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              onSelect(label.id);
            }}>
            {label.title}
          </DropdownItem>
        ))}
      </DropdownContainer>
    );
  }
}

export default LabelDropdown;
