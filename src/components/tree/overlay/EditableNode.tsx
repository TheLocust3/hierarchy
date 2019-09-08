import React from 'react';
import styled from '@emotion/styled';

import { colors, fonts } from '../../../constants';
import { Data, ITree } from '../../../models/tree/tree-base';

import Divider from '../../common/Divider';
import ColumnLayout from '../../common/ColumnLayout';
import Button from '../../common/Button';
import Spacer from '../../common/Spacer';
import SideMargin from '../../common/SideMargin';
import EditableTextField from '../../common/EditableTextField';
import EditableTextArea from '../../common/EditableTextArea';
import AddButton from '../AddButton';
import LabelDropdown from './LabelDropdown';
import Label from './Label';

const Container = styled(ColumnLayout)`
  height: 500px;

  margin: 2.5%;
  margin-left: 5%;
  margin-right: 5%;

  text-align: left;
`;

const LeftColumn = styled('div')`
  width: 70%;
  height: 100%;

  margin-right: 5%;
`;

const RightColumn = styled('div')`
  width: 20%;

  margin-top: 5%;
  margin-bottom: 5%;

  padding-left: 5%;

  border-left: 1px solid ${colors.lightBlack};
`;

const Title = styled('h1')`
  margin-left: 2.5%;
  margin-right: 2.5%;
`;

const Body = styled('div')`
  margin-left: 5%;
  margin-right: 5%;
`;

const ActionTitle = styled('h3')`
  text-align: center;
`;

const ActionsInner = styled('div')`
  margin-left: 10%;
`;

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

interface EditableNodeProps {
  id: string;
  data: Data;
  overlayOpen: boolean;
  labelTrees: ReadonlyArray<ITree>;
  updateNode: (data: Data) => void;
  deleteNode: () => void;
  addLabel: (labelId: string) => void;
}

interface EditableNodeState {
  dropdownShown: boolean;
}

class EditableNode extends React.Component<EditableNodeProps, EditableNodeState> {
  constructor(props: EditableNodeProps) {
    super(props);

    this.state = { dropdownShown: false };
  }

  componentWillReceiveProps(nextProps: EditableNodeProps) {
    if (!nextProps.overlayOpen) {
      this.setState({ dropdownShown: false });
    }
  }

  render() {
    const { id, data, addLabel } = this.props;

    return (
      <Container onClick={() => this.setState({ dropdownShown: false })}>
        <LeftColumn>
          <Title>
            <EditableTextField
              onUnfocus={(value) => this.props.updateNode({ ...this.props.data, title: value })}
              fontSize="26px"
              fontFamily={fonts.title}
              backgroundColor={colors.nodeBackground}>
              {data.title}
            </EditableTextField>
          </Title>
          <Divider marginTop="3%" marginBottom="3%" />

          <SideMargin margin="5%">
            <LabelsHeader>
              Labels
              <AddButtonContainer>
                <AddButton
                  onClick={() => this.setState({ dropdownShown: !this.state.dropdownShown })}
                />
              </AddButtonContainer>
              <LabelDropdown
                labels={this.props.labelTrees.map((tree: ITree) => {
                  return { id: tree.id, name: tree.data.title };
                })}
                isVisible={this.state.dropdownShown}
                onSelect={(id: string) => {
                  addLabel(id);
                  this.setState({ dropdownShown: false });
                }}
              />
            </LabelsHeader>
            <Spacer space="2%" />

            {this.renderLabels()}
          </SideMargin>

          <Spacer space="5%" />

          <Body>
            <EditableTextArea
              onUnfocus={(value) => this.props.updateNode({ ...this.props.data, body: value })}
              fontSize="16px"
              fontFamily={fonts.body}
              backgroundColor={colors.nodeBackground}>
              {data.body}
            </EditableTextArea>
          </Body>
        </LeftColumn>

        <RightColumn>
          <ActionTitle>Actions</ActionTitle>

          <Divider marginTop="3%" marginBottom="5%" />

          <ActionsInner>
            <Spacer space="10%" />
            <Button
              color={colors.viewBlue}
              hoverColor={colors.viewBlueHover}
              activeColor={colors.viewBlueActive}
              textColor="white"
              onClick={(event: any) => (window.location.href = `/tree/${id}`)}>
              Show
            </Button>
            <Spacer space="10%" />

            <Button
              color={colors.deleteRed}
              hoverColor={colors.deleteRedHover}
              activeColor={colors.deleteRedActive}
              textColor="white"
              onClick={(event: any) => this.props.deleteNode()}>
              Delete
            </Button>
          </ActionsInner>
        </RightColumn>
      </Container>
    );
  }

  private renderLabels() {
    const labels = this.props.labelTrees.filter((tree: ITree) => tree.containsITree(this.props.id));
    if (labels.length === 0) return <SideMargin margin="2.5%">None</SideMargin>;

    return (
      <SideMargin margin="2.5%">
        {labels.map((labelTree: ITree) => {
          return (
            <LabelContainer key={labelTree.id}>
              <Label labelTree={labelTree} />
            </LabelContainer>
          );
        })}
      </SideMargin>
    );
  }
}

export default EditableNode;
