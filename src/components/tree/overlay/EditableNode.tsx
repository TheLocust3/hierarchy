import React from 'react';
import styled from '@emotion/styled';
import DateTimePicker from 'react-datetime-picker';

import { colors, fonts } from '../../../constants';
import { Data, ITree } from '../../../models/tree/tree-base';

import Divider from '../../common/Divider';
import ColumnLayout from '../../common/ColumnLayout';
import Button from '../../common/Button';
import Spacer from '../../common/Spacer';
import SideMargin from '../../common/SideMargin';
import EditableTextField from '../../common/EditableTextField';
import EditableTextArea from '../../common/EditableTextArea';
import LabelSection from './LabelSection';
import StatusSection from './StatusSection';

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

interface EditableNodeProps {
  id: string;
  data: Data;
  overlayOpen: boolean;
  specialTrees: ReadonlyArray<ITree>;
  updateNode: (data: Data) => void;
  deleteNode: () => void;
  addLabel: (labelId: string) => void;
  deleteLabel: (labelId: string) => void;
  setStatus: (oldStatusId: string, statusId: string) => void;
}

interface EditableNodeState {
  labelDropdownShown: boolean;
  statusDropdownShown: boolean;
  dueBy: Date;
}

class EditableNode extends React.Component<EditableNodeProps, EditableNodeState> {
  constructor(props: EditableNodeProps) {
    super(props);

    this.state = {
      labelDropdownShown: false,
      statusDropdownShown: false,
      dueBy: new Date()
    };
  }

  render() {
    const { id, data, specialTrees, addLabel, deleteLabel, setStatus } = this.props;

    return (
      <Container
        onClick={() => this.setState({ labelDropdownShown: false, statusDropdownShown: false })}>
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

          <LabelSection
            id={id}
            dropdownShown={this.state.labelDropdownShown}
            dropdownToggle={() =>
              this.setState({
                labelDropdownShown: !this.state.labelDropdownShown,
                statusDropdownShown: false
              })
            }
            dropdownHide={() => this.setState({ labelDropdownShown: false })}
            specialTrees={specialTrees}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
          />
          <br />

          <StatusSection
            id={id}
            dropdownShown={this.state.statusDropdownShown}
            dropdownToggle={() =>
              this.setState({
                labelDropdownShown: false,
                statusDropdownShown: !this.state.statusDropdownShown
              })
            }
            dropdownHide={() => this.setState({ statusDropdownShown: false })}
            specialTrees={specialTrees}
            setStatus={setStatus}
          />
          <br />

          <SideMargin margin="5%">
            <DateTimePicker
              onChange={(date: Date) =>
                this.props.updateNode({ ...this.props.data, dueOn: date.valueOf() })
              }
              value={data.dueOn === undefined ? new Date() : new Date(data.dueOn)}
              clearIcon={null}
              calendarIcon={null}
              disableClock={true}
            />
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
              Tree View
            </Button>
            <Spacer space="10%" />

            <Button
              color={colors.listPurple}
              hoverColor={colors.listPurpleHover}
              activeColor={colors.listPurpleActive}
              textColor="white"
              onClick={(event: any) => (window.location.href = `/tree/${id}/list`)}>
              List View
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
}

export default EditableNode;
