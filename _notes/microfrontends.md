# Basics

**Monolithic Single Page Application** - All of the code of our application is in one single codebase.

**Microfrontend Application** (MFA) - Divided monolithic app into multiple, _smaller apps with their own codebase_.
- The different codebases communicate through **API requests** that manage the data to avoid direct communication between those two distinct projects.
- Each smaller app is responsible for a **distinct feature** of the product.

**Benefits:**
- Multiple engineering teams can work on the apps in isolation.
- Each of these applications can be thought of as separate independent apps which make it easier to understand, develop and maintain as they are not dependent on each other in any way.

We should try to **limit the direct communication between the MFAs** as much as possible. This could be achieved by a **common APIs**.

Common API
![](images/microfrontends/mf%20common%20api.jpg "MF app and common API")  

Container
![](images/microfrontends/mfa%20and%20container.jpg)

Integration
![](images/microfrontends/integration.jpg)
- Build time:
  ![](images/microfrontends/integration%20-%20build%20time.jpg)
- Real-time
  ![](images/microfrontends/integration%20-%20real-time.jpg)

<br/><br/><br/>



# Webpack
[microfrontends\e-commerce](../microfrontends/e-commerce)

```js
module.exports = {
  mode: 'development',
  devServer: {
    port: 8081
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
```

<br/><br/><br/>

# Module federation

## Steps

![](images/microfrontends/module%20federation%20steps.jpg)

- **MF #1 - products**  
Expose files:  
[microfrontends/e-commerce/products/webpack.config.js](../microfrontends/e-commerce/products/webpack.config.js):
```js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      fileName: 'remoteEntry.js',
      exposes: {
        './ProductsIndex': './src/index'
      }
    })
  ]
}
```

- **Container**
  - refactor the entry point to load **asynchronously**. The idea of that file is to allow Webpack the opportunity to go and fetch some additional JS from the MFAs (products, faker, etc..) inside the browser before running our `index.js`  
  [microfrontends/e-commerce/container/src/index.js](../microfrontends/e-commerce/container/src/index.js):
  ```js
  import('./bootstrap') // this way it loads the module ASYNCHRONOUSLY
  ```
  - setup the Module Federation Plugin to fetch the _exposed files_
  [microfrontends/e-commerce/container/webpack.config.js](../microfrontends/e-commerce/container/webpack.config.js):
  ```js
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        products: 'products@http://localhost:8081/remoteEntry.js'
      },
      exposes: {
        './ProductsIndex': './src/index'
      }
    })
  ]
  ```

  - import the needed remote 
    [microfrontends/e-commerce/container/src/bootstrap.js](../microfrontends/e-commerce/container/src/bootstrap.js)

    ```js
    import 'products/ProductsIndex'
    ```

  - add the Products DOM container to the Container's HTML, since the Products project needs it
  [](../microfrontends/e-commerce/container/public/index.html)
  ```html
  <div id="dev-products"></div>
  ```

<br/>

## Understanding Module Federation

**Remote mode** - When we take code out of our current project and make it available to other projects.

A **Host** requires code from the **Remote**.

<br/><br/>


### Module Federation **Microfrontends** (Products)
<br/>

![](images/microfrontends/module%20federation.jpg)

Webpack emits two different sets of **files**:

- The bundled `index.js` file that spits out the `main.js` file that includes everything from `index.js` along with all of the **dependencies** that it requires. **This allows us to run the Products project as a standalone environment (in isolation).**

- Due to the **Module Federation Plugin**, we **output** another set of files:

  - `remoteEntry.js` - It contains a **list** of all files available in the project and the **directions** on how to load them. E.g, if the container wants to load something from `src_index.js` `remoteEntry.js`, will give instructions on how this can be done.
  - `src_index.js`
  - `faker.js`

<br/><br/>


### Module Federation **Container**
<br/>

![](images/microfrontends/module%20federation%20container.jpg)


The `index.js` / `bootstrap.js` separation allows Webpack the opportunity to **fetch additional code** and make sure we have the **project code** along with the **dependency code** (`faker`) ready **before** something is done with it in `bootstrap.js`.

<br/><br/>


### Flow of **execution** of the files
<br/>

![](images/microfrontends/module%20federation%20file%20execution%20flow.jpg)

<br/><br/>


### Understanding the **configuration** options

- [container/webpack.config.js](../microfrontends/e-commerce/container/webpack.config.js)
![](images/microfrontends/module%20federation%20config.jpg)

  In Container's `bootstrap.js`:
  ```js
  import 'products/ProductsIndex'
  ```
  Webpack sees we need a module that starts with `products`, then checks for it in `node_modules` and if it doesn't find it there, then checks in the `remotes` section of the `ModuleFederationPlugin`. In it, Webpack sees it **matches** with the _key_ `remotes.products` so it loads the remote entry file specified there.

<br/>

  - [products/webpack.config.js](../microfrontends/e-commerce/products/webpack.config.js)
![](images/microfrontends/module%20federation%20config%20products.jpg)

_`name` should match with the `remotes.products` value part before the `@` character in Container's `webpack.config.js`._

`exposes` - which files of the project will we expose to the outside world and bind them to an alias (`ProductsIndex`). After that in Container's `bootstrap.js` -> `import 'products/ProductsIndex'`

<br/>

Example teams organization:
![](images/microfrontends/mf%20teams%20and%20html.jpg)

<br/><br/><br/>

# Sharing dependencies between apps

![](images/microfrontends/dependency%20sharing.jpg)

In MFAs' (Products and Cart) `webpack.config.js`:
```js
new ModuleFederationPlugin({
  ...
  shared: ['faker']
})
```

_**ERROR**: main.js:1034 Uncaught Error: Shared module is not available for eager consumption: webpack/sharing/consume/default/faker/faker_

> **Note**: When we mark a module as shared it’s **loaded asynchronously**. The projects using shared modules won’t run in isolation because the code loads before the module. Therefore the code has to be loaded in a `bootstrap.js` file.


<br/><br/>


## Shared Module Versioning

If the versions of a package are significantly different, webpack **will load different copies** of the package for each project that uses it. If the versions aren’t the same, but they **fit** in the version rules, added to all MFAs `package.json` files regarding `^` and `~` then a **single copy will be loaded** (e.g. `^5.1.0` and `^5.7.2`; `~2.0.2` and `~2.0.7`; `~3.3.1` and `^3.0.0`).

<br/><br/>

## Singleton loading

In the above scenario, “faker” can be loaded multiple times and it will work. However, there are other modules (like React) where **we cannot load them up multiple times**. To resolve this we can change the config to this:

In MFAs' `webpack.config.js` files:
```js
{
  plugins: [
    new ModuleFederationPlugin({
      ...
      shared: {
        faker: {
          singleton: true
        }
      }
    })
  ]
}
```

Adding `singleton: true` tells webpack that we want to load **only one copy** of “faker” no matter what.

_If the single loaded version doesn't satisfy the required version range from any MFA, Webpack will show a warning in the console (about unsatisfied version of a singleton module)._

<br/><br/>

## Sub-App Execution Context

The separate modules cannot predict the structure of the Container. Therefore we need to adapt the code for the situation where we are in isolation and one where the code is being used from the container.

[microfrontends/e-commerce/products/src/bootstrap.js](../microfrontends/e-commerce/products/src/bootstrap.js)
```js
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
  const el = document.querySelector('#dev-products')
  if (el) mount(el)
}

// Context/Situation 2
// We are running this file in a development or production
// through the Container app
// There's NO GUARANTEE that an element with an id of 'dev-products' exists
// also WE DON'T WANT TO immediately render the app because we are not sure if it's currently needed
export { mount } // now the Container can import and use it whenever it needs to
```
<br/>

We’d also need to **expose** `bootstrap.js` in our webpack.config.js as it is where our mount function is being exported.

[microfrontends/e-commerce/products/webpack.config.js](../microfrontends/e-commerce/products/webpack.config.js)
```js
exposes: {
  // './ProductsIndex': './src/index'
  './ProductsIndex': './src/bootstrap'
}
```

### Using the mount functions in the Container:

```js
import { mount as productsMount } from 'products/ProductsIndex';
import { mount as cartMount } from 'cart/CartShow';

productsMount(document.querySelector('#my-products'));
cartMount(document.querySelector('#my-cart'));
```

> **NOTE**: Having in the Container HTML an element with an ID equal to any name in MFA's `new ModuleFederationPlugin({ name: ...})` will cause a strange error: `fn is not a function while loading ...`. _Explained in [section 3, video 29](https://www.udemy.com/course/microfrontend-course/learn/lecture/23206900)._

<br/><br/><br/>


# Linking Multiple Apps Together - React


<br/><br/>

