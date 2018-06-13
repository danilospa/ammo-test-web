import React from 'react';
import NumberFormat from 'react-number-format';

const Price = ({ value }) => (
  <NumberFormat value={value} displayType={'text'} thousandSeparator={'.'} prefix={'R$'} decimalSeparator={','} fixedDecimalScale={true} decimalScale={2}/>
);

export default Price;
