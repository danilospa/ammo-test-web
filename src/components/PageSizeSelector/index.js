import React from 'react';

class PageSizeSelector extends React.Component {
  handleChange = (event) => {
    const pageSize = Number(event.target.value);
    this.props.onChange(pageSize);
  }

  render() {
    const { label, options } = this.props;

    return (
      <select onChange={this.handleChange} value={this.props.pageSize}>
        { options.map((option, index) => (
          <option key={index} value={option}>{option} {label}</option>
        ))}
      </select>
    );
  }
}

export default PageSizeSelector;
