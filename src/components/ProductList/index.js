import React from 'react';
import Product from '../Product/index';

const ProductList = (props) => (
  <div>
    {props.products.map((p) => (<Product key={p.id} product={p} />))}
  </div>
);

export default ProductList;
