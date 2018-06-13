import React from 'react';
import Product from '../Product/index';
import './index.css';

const ProductList = (props) => (
  <div className="product-list">
    {props.products.map((p) => (<Product key={p.id} product={p} />))}
  </div>
);

export default ProductList;
