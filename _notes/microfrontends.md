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

**Requirements:**
- **Zero coupling** between **child** projects - technologies and frameworks get replaced sometimes
  - **No importing** of functions/objects/classes/etc
  - **No shared state**
  - **Shared libraries** through ModuleFederation is ok
- **Near-zero coupling** between **container and child** apps
  - Container **shouldn't assume** that a child is using a particular **framework**
  - any necessary **communication** is done with **callbacks** and **simple events**

- **CSS** from one project should **never affect** another

- Version control (**monorepo** vs **separate**) **shouldn't have any impact** on the overall project - some people prefer monorepos while others separate repos

- (production) **Container** should be able to decide to always use the **latest version** of a MF **or** specify a **specific version**
  - always latest version - doesn't need a redeploy of the Container
  - specific version - requires a redeploy to change

<br/>

**PROJECT:** [microfrontends/react-projects/packages](../microfrontends/react-projects/packages)

> **NOTE:** ModuleFederation plugin configuration is slightly different in dev and prod modes.

`webpack.common.js`
```js
module.exports = {
  module: {
    // tell webpack how to process different files as we import them into our project
    rules: [
      {
        test: /\.m?js$/, // if ends with .mjs or .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // @babel/preset-react - babel will process all JSX tags
            // @babel/preset-env - all modern syntax will be converted to ES5
            presets: ['@babel/preset-react', '@babel/preset-env'],
            // @babel/plugin-transform-runtime - will add in some additional code to enable additional features in the browser like async/await syntax, etc.
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
}
```

`marketing/config/webpack.dev.js`
```js
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing', // NOTE: a global var gets declared with that name
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
```

**Merge** is a function that we can use to merge together two different webpack config objects.

> **Note:** `mount` should stay a function so that the container doesn’t assume that a child is using a particular framework.

## Delegating Shared Module Selection

Webpack will automatically take care of the shared packages. You might not always want to use that because you might want to use the exact versions and settings around the shared modules.

Container's `webpack.dev.js`
```js
const packageJson = require('../package.json')

{
  ...
  plugins: [
    ...
      // To configure this, we can connect the dependencies of `package.json` to the shared key in webpack.dev.js
      shared: packageJson.dependencies,
    })
}
```

<br/><br/>


# CI/CD Pipeline

## Deployment

- want to deploy each MF **independently** (incl. the Container) - _As different developers will be working independently on the projects._
- location of child app `remoteEntry.js` files must be known at _build time_ - _The URL of the child apps has to be available for the container’s webpack configuration. The production config will contain the production version of the remote entry URL._
- many FE development solutions assume you are deploying a single project - we need something that can handle multiple different ones - _Not all hosting providers support MFE builds._
- probably some sort of CI/CD
- _at present_, the `remoteEntry.js` file name is fixed! Need to think about caching issues - _The module federation plugin has a fixed name for the remoteEntry.js file but a dynamic approach is in development._

<br/>

## Deployment flow

1. Build a GitHub Monorepo (the same flow works for deploying the modules separately)
2. Make a script that watches the modules for changes.
3. The script builds a production version of the changed module with webpack
4. The files are uploaded to Amazon S3

> Amazon S3 will hold the build version of all of the sub-projects.

> The files will be served to the browser through Amazon CloudFront (CDN)

<br/>

## Webpack production config

`container/webpack.prod.js`
```js
const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN // will be set when we build our app by a CI/CD pipeline

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)
```

`container/package.json`
```json
  "scripts": {
    ...
    "build": "webpack --config config/webpack.prod.js"
  },
```

<br/><br/>


## CI/CD - Automatic code run on a specific event

<br/>

> **Github Actions** - code that executes automatically when some event occurs to the repo.  

_Github automatically detects these files as some workflows we intend to use:_

[`microfrontends/react-projects/.github/workflows/container.yml`](../microfrontends/react-projects/.github/workflows/container.yml)
```yml
name: deploy-container

# what events are we watching for (on changes where)
on:
  push:
    branches:
      - master
    paths:
      - 'packages/container/**'

# sets execution env (all commands will be executed relative to this folder)
defaults:
  run:
    working-directory: packages/container

# we can define multiple parallel jobs
jobs:
  build: # build and deploy our project (could be also separate jobs)
    runs-on: ubuntu-latest # github offers a variety of VMs to run jobs on

    steps: # the commands we want to execute
      - uses: actions/checkout@v2 # checkout our code into the VM
      - run: npm install
      - run: npm run build

      # use the AWS CLI
      - uses: chrislennon/action-aws-cli@v1.1
      - run: aws s3 sync dist s3://${{ secrets.AWS_S3_BUCKET_NAME }}/container/latest # sync our dist folder to aws
        env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

```


`.github > workflows > project.yml`:
```yml
// example code
name: deploy-container

on:
  push:
    branches:
      - master
    paths:
      - "packages/container/**"

defaults:
  run:
    working-directory: packages/container

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build

      - uses: shinyinc/action-aws-cli@v1.2
      - run: aws s3 sync dist s3://${{ secrets.AWS_S3_BUCKET_NAME }}/container/latest
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: ""
```

<br/><br/>


## Workflow for deploying module (e.g. container)

Whenever code is pushed to the main/master branch and this commit contains a change to the module (e.g. container folder):

- Commands executed in a virtual machine hosted by Github

  1. Checkout the code to the repository (load it into the VM environment)

  2. Change into the container folder

  3. Install dependencies

  4. Create a production build using webpack (webpack.prod.js)

  5. Upload the result (dist folder content) to AWS S3