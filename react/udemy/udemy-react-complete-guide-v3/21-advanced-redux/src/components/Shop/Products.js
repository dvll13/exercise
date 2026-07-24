import ProductItem from './ProductItem'
import classes from './Products.module.css'

const DUMMY_PRODUCTS = [
  { id: 'p1', title: 'Test', price: 6, description: 'This is a first product - amazing!' },
  { id: 'p2', title: 'Book', price: 4, description: 'My first book' },
  { id: 'p3', title: 'TV', price: 30, description: '2nd hand tv' },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products
