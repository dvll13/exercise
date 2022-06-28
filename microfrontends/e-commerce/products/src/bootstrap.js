import faker from 'faker'

const mount = (el) => {
  let products = ''

  for (let i = 0; i < 5; i++) {
    const name = faker.commerce.productName()
    products += `<div>${name}</div>`
  }

  // document.getElementById('dev-products').innerHTML = products
  el.innerHTML = products
}

// Context/Situation 1
// We are running this file in development in isolation
// we are using our local index.html file
// which DEFINITELY has an element with id of 'dev-products'
// We want to immediately render our app in that element

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#products-dev')
  if (el) mount(el)
}

// Context/Situation 2
// We are running this file in a development or production
// through the Container app
// There's NO GUARANTEE that an element with an id of 'dev-products' exists
// also WE DON'T WANT TO immediately render the app because we are not sure if it's currently needed
export { mount } // now the Container can import and use it whenever it needs to
