## typescript = js + a type system  

## The TS Type System
- helps catch errors **during coding**
- uses 'types annotations' to analyze code
- only active *during development*
- doesn't provide *performance optimization*

## ts -> compiler -> js

`npm i -g typescript ts-node`

`tsc index.ts` - ts compile and create `index.js`  
`ts-node index.ts` - compile `ts` to `js` and run it *(index.ts => index.js; node index.js)*  

**interface** - used to define the structure of an object; some of the props in an interface can be ignored  

```
interface Todo {
  id: number
  title: string
  completed: string
}
  ...

const todo = response.data as Todo

const logToDo = (id: number, title: string, completed: boolean)
```