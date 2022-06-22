import { Product } from './product.model'
import _ from 'lodash'
// class-transformer:
import 'reflect-metadata'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

console.log(_.shuffle([1, 2, 3]))

declare var GLOBAL: any // tells TS not to worry about this global var
console.log(GLOBAL)

// products
const products = [
  { title: 'A carpet', price: 29.99 },
  { title: 'A book', price: 10.99 }
]

// const loadedProducts = products.map((product) => new Product(product.title, product.price))

// using class-transformer
const loadedProducts = plainToInstance(Product, products)

for (const product of loadedProducts) {
  console.log(product.getInformation())
}

// using class-validator
const p = new Product('book', -3.99)
validate(p).then((errors) => {
  if (errors) {
    console.log('Validation errors:', errors)
  } else {
    console.log(p.getInformation())
  }
})
