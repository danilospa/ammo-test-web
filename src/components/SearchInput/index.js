import React from 'react';
import './index.css';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  handleChange = ({ target: { value } }) => this.setState({ value });

  search = (event) => {
    const term = event.target.value;
    if (term !== this.props.value) {
			this.props.onSearch(term);
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.search(event);
    }
  }

  clear = () => {
    this.setState({ value: '' });
    this.search({ target: { value: '' }});
  }

  render() {
    return (
      <div className="search-input__wrapper">
        <input
          className="search-input"
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.search}
          onKeyPress={this.handleKeyPress}
          />
        <button
          className="search-input__clear-button"
          onClick={this.clear}
          >
        </button>
      </div>
    );
  }
}

export default SearchInput;
