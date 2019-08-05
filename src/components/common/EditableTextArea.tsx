import React from 'react';

import { fonts } from '../../constants';

import { StyledTextArea } from './StyledTextField';

interface EditableTextAreaProps {
  children: string;
  fontSize?: string;
  fontFamily?: string;
  backgroundColor?: string;
  onUnfocus: (value: string) => void;
}

interface EditableTextAreaState {
  value: string;
}

class EditableTextArea extends React.Component<EditableTextAreaProps, EditableTextAreaState> {

  constructor(props: EditableTextAreaProps) {
    super(props);

    this.state = { value: this.props.children };
  }

  render() {
    const { children, onUnfocus } = this.props;
    const fontSize = this.props.fontSize === undefined ? '18px' : this.props.fontSize
    const fontFamily = this.props.fontFamily === undefined ? fonts.body : this.props.fontFamily
    const backgroundColor = this.props.backgroundColor === undefined ? 'white' : this.props.backgroundColor

    return (
      <StyledTextArea
        defaultValue={children}
        onChange={(event: any) => this.setState({ value: event.target.value })}
        onBlur={() => onUnfocus(this.state.value)}
        onFocus={(event: any) => event.target.select()}
        fontSize={fontSize}
        fontFamily={fontFamily}
        backgroundColor={backgroundColor}
      />
    );
  }
}

export default EditableTextArea;
