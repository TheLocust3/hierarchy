import React from 'react';
import styled from '@emotion/styled';

import Column from '../../../models/card/column';

const ColumnContainer = styled('div')``;

const ColumnTitle = styled('div')``;

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
