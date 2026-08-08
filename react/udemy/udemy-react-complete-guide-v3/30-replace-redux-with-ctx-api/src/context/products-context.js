import { createContext, useState } from 'react'

const PRODUCTS = [
  {
    id: 'p1',
    title: 'Red Scarf',
    description: 'A pretty red scarf.',
    isFavorite: false,
  },
  {
    id: 'p2',
    title: 'Blue T-Shirt',
    description: 'A pretty blue t-shirt.',
    isFavorite: false,
  },
  {
    id: 'p3',
    title: 'Green Trousers',
    description: 'A pair of lightly green trousers.',
    isFavorite: false,
  },
  {
    id: 'p4',
    title: 'Orange Hat',
    description: 'Street style! An orange hat.',
    isFavorite: false,
  },
]

export const ProductsContext = createContext({
  products: [],
  toggleFav: (id) => {},
})

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState(PRODUCTS)

  const toggleFav = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts]
      const updatedItemIdx = updatedProducts.findIndex((p) => p.id === id)
      const newFavStatus = !updatedProducts[updatedItemIdx].isFavorite
      updatedProducts[updatedItemIdx] = {
        ...updatedProducts[updatedItemIdx],
        isFavorite: newFavStatus,
      }
      return updatedProducts
    })
  }

  return <ProductsContext.Provider value={{ products, toggleFav }}>{props.children}</ProductsContext.Provider>
}

export default ProductContextProvider
