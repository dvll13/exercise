> `<template>` - define some templates that are not rendered initially, but later with JS when needed
```html
<template id="template1">
  <div>Test</div>
</template>
<div id="container"></div>
```

```js
const t = document.getElementById('template1')
const deepClone = true
const importedNode = document.importNode(t.content, deepClone)
const element = importedNode.firstElementChild
document.getElementById('container').insertAdjacentElement('afterbegin', element)
```