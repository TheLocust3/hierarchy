import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import Column from '../../../models/card/column';

const ColumnContainer = styled('div')`
  width: 300px;
  height: 90vh;
  max-height: 90vh;

  margin-top: 10px;
  margin-left: 7px;
  margin-right: 7px;

  padding: 10px;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  background-color: ${colors.nodeBackground};
`;

const ColumnTitle = styled('h3')``;

interface ListColumnProps {
  column: Column;
}

class ListColumn extends React.Component<ListColumnProps> {
  render() {
    const { column } = this.props;

    return (
      <ColumnContainer>
        <ColumnTitle>{column.name}</ColumnTitle>
      </ColumnContainer>
    );
  }
}

export default ListColumn;
