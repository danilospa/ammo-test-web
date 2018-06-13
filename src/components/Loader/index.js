import React from 'react';
import './index.css';

const Loader = (props) => {
  return props.show ? (<div className="loader"></div>) : null;
};

export default Loader;
