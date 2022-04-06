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
`npm i -g parcel-bundler` - helps run TS in the browser
  * `parcel index.html` - starts the server and when it sees a ts file, it auto converts it to js  

`npx create-react-app <app_name> --template typescript` - create react ts app
<br/> <br/> 

**interface** - used to define the structure of an object; some of the props in an interface can be ignored  

```
interface Todo {  // this is a type
  id: number
  title: string
  completed: string
}

export interface Mappable {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
}
  ...

const todo = response.data as Todo
export class User implements Mappable {} // implements - optional, helps TS show better placed errors

const logToDo = (id: number, title: string, completed: boolean)

arg?: string //optional argument
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
<br/><br/><br/>

# Type definition file (*.d.ts)  
*describes the different types of values, functions, classes that exist in a js library*  

### TS -> Type definition file -> JS Library  
if a TDF is missing in a JS Lib (for which there's a warning), then it could be found and used from "Definitely Typed" (`@types/[js-lib-name]`)

`npm i @types/faker`
<br/><br/><br/><br/>


# CLASSES  

modifiers (keywords):
  * **private** - can only be called by *other methods* in *this* class
  * **protected** - can be called by other methods in *this* class, or by other methods in *child* classes
  * **public** *(default)* - can be called anywhere
<br/><br/><br/><br/>


# REACT + TS  

`React.FC` ~ `React.FunctionComponent`  
<br/>

## PROPS 

`Child.tsx, Parent.tsx`:
```
interface ChildProps {
  color: string
  onClick: () => void
}

export const Child = (props: ChildProps) => {...}
export const Child = ({ color, onClick }: ChildProps) => {...}

//BETTER: 
export const ChildAsRFC: React.FC<ChildProps> = ({ color, onClick }) => {...}
```

Using the _second_ approach TS recognizes this as a _React Function Component_, so that:
- might have props like `propTypes`, `contextTypes`, `displayName`, etc.
- `<SomePropsInterface>` - tells what props types will be received
- expects a `children` prop by default
<br/><br/>

## STATE  

`GuestList.tsx`:
```
  const [guests, setGuests] = useState([]) // TS assumes that the array will be forever empty -> guests: never[]
  const [guests, setGuests] = useState<string[]>([]) // now all is good

  const [user, setUser] = useState<{ name: string; age: number } | undefined>()
```  
<br/><br/>

## EVENTS
`EventComponent.tsx`:
```
// TS knows what `e` is because it's an onChange callback
<input type="text" onChange={(e) => console.log(e)} />

==============


// TS know doesn't know what `e` is -> e: any, so it must be specified
const onChange = (e) => {...}

<input type="text" onChange={onChange} />

--------------------------------

// the type can be copied from the onChange tooltip:
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {...}
```