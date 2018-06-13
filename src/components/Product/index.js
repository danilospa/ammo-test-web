import React from 'react';
import Price from '../Price';
import './index.css';

const Product = ({ product }) => (
  <div className="product">
    <div className="product__images">
      {product.images.slice(0, 4).map((image, index) => (
        <div key={index} className="product__image-wrapper">
          <img src={image} alt={`Imagem para produto ${product.name}`}/>
        </div>
      ))}
    </div>
    <div className="product__main-content">
      <h3>{product.name}</h3>
      <div className="product__information">
        <p>{product.type}</p>
        <p>{product.extraInformation}</p>
      </div>
    </div>
    <div className="product__price-wrapper">
      <p className="product__old-price">
        <Price value={product.oldPrice}/>
      </p>
      <span>por</span>
      <p className="product__current-price">
        <Price value={product.currentPrice}/>
      </p>
    </div>
  </div>
);

export default Product;
