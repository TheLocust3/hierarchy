import React from 'react';

interface MaterialIconProps {
  icon: string;
  fontSize?: string;
  color?: string;
}

interface Style {
  fontSize?: string;
  color?: string;
}

class MaterialIcon extends React.Component<MaterialIconProps, {}> {
  render() {
    const { icon, fontSize, color } = this.props;

    let style: Style = fontSize === null ? {} : { fontSize: fontSize }
    style = color === null ? style : { ...style, color: color }

    return (
      <i className="material-icons" style={style}>
        {icon}
      </i>
    );
  }
}

export default MaterialIcon;
