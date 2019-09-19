import React from 'react';

import { fonts } from '../../constants';

import { StyledTextField } from './StyledTextField';

interface EditableTextFieldProps {
  children: string;
  fontSize?: string;
  fontFamily?: string;
  backgroundColor?: string;
  onUnfocus: (value: string) => void;
}

interface EditableTextFieldState {
  value: string;
}

class EditableTextField extends React.Component<EditableTextFieldProps, EditableTextFieldState> {
  constructor(props: EditableTextFieldProps) {
    super(props);

    this.state = { value: this.props.children };
  }

  componentWillReceiveProps(nextProps: EditableTextFieldProps) {
    if (nextProps.children !== this.state.value) {
      this.setState({
        value: nextProps.children
      });
    }
  }

  render() {
    const { onUnfocus } = this.props;
    const fontSize = this.props.fontSize === undefined ? '18px' : this.props.fontSize;
    const fontFamily = this.props.fontFamily === undefined ? fonts.body : this.props.fontFamily;
    const backgroundColor =
      this.props.backgroundColor === undefined ? 'white' : this.props.backgroundColor;

    return (
      <StyledTextField
        type="text"
        value={this.state.value}
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

export default EditableTextField;
