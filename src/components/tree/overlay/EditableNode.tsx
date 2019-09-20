import React from 'react';
import styled from '@emotion/styled';
import DateTimePicker from 'react-datetime-picker';
import { GithubPicker } from 'react-color';

import { colors, customColors, fonts } from '../../../constants';
import { Data } from '../../../models/tree/tree-base';
import Label from '../../../models/label';
import Status from '../../../models/status';

import Divider from '../../common/Divider';
import ColumnLayout from '../../common/ColumnLayout';
import Spacer from '../../common/Spacer';
import SideMargin from '../../common/SideMargin';
import EditableTextField from '../../common/EditableTextField';
import EditableTextArea from '../../common/EditableTextArea';
import LabelSection from './LabelSection';
import StatusSection from './StatusSection';
import ActionColumn from './ActionColumn';

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

const Title = styled('h1')`
  margin-left: 2.5%;
  margin-right: 2.5%;
`;

const Body = styled('div')`
  margin-left: 5%;
  margin-right: 5%;
`;

interface ColorSwatchProps {
  color: string;
}

const ColorSwatch = styled('div')<ColorSwatchProps>`
  position: absolute;
  display: inline-block;

  width: 20px;
  height: 20px;

  margin-left: 5px;

  border: 1px solid ${colors.lightBlack};
  border-radius: 3px;
  overflow: hidden;

  background-color: ${(props: ColorSwatchProps) => props.color};

  filter: brightness(100%);
  -webkit-filter: brightness(100%);

  transition: background-color 0.25s, filter 0.25s;

  cursor: pointer;

  &:hover {
    filter: brightness(95%);
    -webkit-filter: brightness(95%);
  }
`;

interface PickerProps {
  open: boolean;
}

const Picker = styled('div')<PickerProps>`
  opacity: ${(props: PickerProps) => (props.open ? 1 : 0)};
  visibility: ${(props: PickerProps) => (props.open ? 'initial' : 'hidden')};

  transition: opacity 0.25ms, visibility 0.25ms;

  margin-left: 38px;
  margin-top: 8px;
`;

interface EditableNodeProps {
  id: string;
  color?: string;
  data: Data;
  allLabels: ReadonlyArray<Label>;
  labels: ReadonlyArray<Label>;
  allStatuses: ReadonlyArray<Status>;
  status: Status | undefined;
  overlayOpen: boolean;
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
  pickerOpen: boolean;
}

class EditableNode extends React.Component<EditableNodeProps, EditableNodeState> {
  constructor(props: EditableNodeProps) {
    super(props);

    this.state = {
      labelDropdownShown: false,
      statusDropdownShown: false,
      dueBy: new Date(),
      pickerOpen: false
    };
  }

  render() {
    const {
      id,
      color,
      data,
      allLabels,
      labels,
      allStatuses,
      status,
      addLabel,
      deleteLabel,
      setStatus
    } = this.props;

    return (
      <Container
        onClick={() =>
          this.setState({
            labelDropdownShown: false,
            statusDropdownShown: false,
            pickerOpen: false
          })
        }>
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
            allLabels={allLabels}
            labels={labels}
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
            allStatuses={allStatuses}
            status={status}
            setStatus={setStatus}
          />
          <br />

          <SideMargin margin="5%">
            Due By:
            <Spacer space="2.5%" />
            <SideMargin margin="2.5%">
              <DateTimePicker
                onChange={(date: Date) =>
                  this.props.updateNode({ ...this.props.data, dueOn: date.valueOf() })
                }
                value={
                  data.dueOn === undefined || data.dueOn === null ? null : new Date(data.dueOn)
                }
                clearIcon={null}
                calendarIcon={null}
                disableClock={true}
              />
            </SideMargin>
          </SideMargin>
          <br />

          <SideMargin margin="5%">
            Color:
            <ColorSwatch
              color={color === undefined ? colors.nodeBackground : color}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                this.setState({ pickerOpen: !this.state.pickerOpen });
              }}
            />
            <Picker open={this.state.pickerOpen}>
              <GithubPicker
                colors={customColors}
                onChange={(color) => {
                  this.props.updateNode({
                    ...this.props.data,
                    color: color.hex === colors.nodeBackground ? '' : color.hex
                  });
                }}
              />
            </Picker>
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

        <ActionColumn id={id} deleteNode={this.props.deleteNode} />
      </Container>
    );
  }
}

export default EditableNode;
