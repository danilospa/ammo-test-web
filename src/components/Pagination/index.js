import _ from 'lodash';
import React from 'react';
import './index.css';

class Pagination extends React.Component {
  goToFirstPage = () => {
    const { current } = this.props;
    if (current === 1) {
      return;
    }

    this.props.onClick(1);
  }

  goToLastPage = () => {
    const { current, pages } = this.props;
    if (current === pages) {
      return;
    }

    this.props.onClick(pages);
  }

  goToPreviousPage = () => {
    const { current } = this.props;
    if (current === 1) {
      return;
    }

    this.props.onClick(current - 1);
  }

  goToNextPage = () => {
    const { current, pages} = this.props;
    if (current === pages) {
      return;
    }

    this.props.onClick(current + 1);
  }

  goToPage = (n) => {
    const { current } = this.props;
    if (current === n) {
      return;
    }

    this.props.onClick(n);
  }

  render() {
    const { current, pages } = this.props;
    const itemClassName = (item) => current === item ? '-active' : '';

    const wrapperClass = `${current === 1 ? '-first' : ''} ${current === pages ? '-last' : ''}`;

    return (
      <div className={`pagination ${wrapperClass}`}>
        <button onClick={this.goToFirstPage}>{'|<'}</button>
        <button onClick={this.goToPreviousPage}>{'<'}</button>
        { _.range(pages).map((n) => (
          <button key={n} className={`pagination__number ${itemClassName(n + 1)}`} onClick={() => this.goToPage(n + 1)}>{n + 1}</button>
        ))}
        <button onClick={this.goToNextPage}>{'>'}</button>
        <button onClick={this.goToLastPage}>{'>|'}</button>
      </div>
    );
  }
}

export default Pagination;
