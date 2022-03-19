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
interface Todo {  // this is a type
  id: number
  title: string
  completed: string
}
  ...

const todo = response.data as Todo

const logToDo = (id: number, title: string, completed: boolean)
```
<br/><br/>  


# SYNTAX & FEATURES

**type** - easy way to refer to the different props & fns a value has, eg. string. every value has a type  
<br/><br/> 

**type annotation** - code *we* add to tell TS what type of value a variable will refer to. We should rely on it:
  - when we declare a var on one line then initialize it later
  - when we want the var to have a type that can be inferred
  - when a function returns the 'any' type and we want to clarify the value

**type inference** -  *TS* tries to figure out what type of value a variable refers to (*when the variable is initialized with a value/expression on the same line*). We should rely on it:
  - whenever we can  
<br/><br/>

**the 'any' type** - TS doesn't know what type the value is, we should **avoid** leaving 'any'. TS **can't** do any error checking around that value  


**functions** - TS tries to infer the *return* value type, but the *arguments* types **must** be specified by us