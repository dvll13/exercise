import React, { use } from 'react'
// import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem'
import './Products.css'

import { ProductsContext } from '../context/products-context'

const Products = (props) => {
  // const productList = useSelector(state => state.shop.products);
  const ctx = use(ProductsContext)
  return (
    <ul className="products-list">
      {ctx.products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  )
}

export default Products
