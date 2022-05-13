## Slice
[react\redux-saga\redux-essentials-example-app\src\features\posts\postsSlice.js](..%5Creact%5Credux-saga%5Credux-essentials-example-app%5Csrc%5Cfeatures%5Cposts%5CpostsSlice.js)
```
import { createSlice } from '@reduxjs/toolkit'

// createSlice (using the Immer library) lets us write "mutating" logic in our reducers
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    }
  }
})

/*
  console.log({ action }) ->
    {
      "type": "posts/addPost",
      "payload": {
        "title": "test",
        "content": "test text"
      }
    }
*/

//                                        (action type prefix, payload creation callback)
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})
// => 'posts/fetchPosts/pending', 'posts/fetchPosts/fulfilled'

export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (id) => (state) => state.posts.posts.find((post) => post.id === id)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
```

## Add post
```
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addPost } from './postsSlice'

const dispatch = useDispatch()
const onSave = () => dispatch(addPost({ id: nanoid(), title, content }))
```

## List posts
```
import { useSelector } from 'react-redux'
import { selectPosts } from './postsSlice'

const posts = useSelector(selectPosts)

const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date)) // make a copy & order it by date DESC
```

> **dispatch().unwrap()**  
_Redux Toolkit adds a .unwrap() function to the returned Promise, which will return a new Promise that either has the actual action.payload value from a fulfilled action, or throws an error if it's the rejected action. This lets us handle success and failure in the component using normal try/catch logic._
`await dispatch(addNewPost({ title, content, userId })).unwrap()`

<br/><br/> 


------------
If an action needs to contain a unique ID or some other random value, always generate that first and put it in the action object. **REDUCERS SHOULD NEVER CALCULATE RANDOM VALUES**, because that makes the results unpredictable.

Fortunately, createSlice lets us define a **"prepare callback"** function when we write a reducer. The "prepare callback" function can take multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed to decide what values go into the action object. It should then return an object with the payload field inside. (The return object may also contain a meta field, which can be used to add extra descriptive values to the action, and an error field, which should be a boolean indicating whether this action represents some kind of error.)

_createSlice and createAction_ can accept a "prepare callback" that returns the action payload  
_Reducers_ can contain whatever logic is needed to calculate the next state  
_Action objects_ should contain just enough info to describe what happened

it's always better to **KEEP THE ACTION OBJECTS AS SMALL AS POSSIBLE**, AND DO THE STATE UPDATE CALCULATIONS IN THE REDUCER. This also means that reducers can contain _as much logic as necessary_ to calculate the new state.


It's often a good idea to encapsulate data lookups by writing **REUSABLE SELECTORS**. You can also create **"memoized"** selectors that can help improve performance.  
Don't feel like you need to write selectors for every single field of your state. Try starting without any selectors, and add some later when you find yourself looking up the same values in many parts of your application code.

Alternately, **extraReducers** can also be an object. This is a legacy syntax - it's still supported, but we recommend the "BUILDER CALLBACK" syntax as it works better with TypeScript.

**useSelector** will re-run every time an action is dispatched, and that it forces the component to re-render if we return a new reference value.


# OPTIMIZATIONS

## 1) MEMOIZING
```
const postsForUser = useSelector((state) => {
  const allPosts = selectAllPosts()
  return allPosts.filter((post) => post.user === userId) // filter returns always a NEW ARRAY, which makes the hook return new value and make the component RE-RENDER UNNECESSARILY
})
```

**Reselect** is a library for creating memoized selector functions, and was specifically designed to be used with Redux. createSelector function that generates MEMOIZED selectors that will only recalculate results when the inputs change. Redux Toolkit exports the **createSelector** function, so we already have it available.

> SOLUTION:
```
export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) =>
  posts.filter((post) => post.user === userId)
) // memoized (If we try calling selectPostsByUser multiple times, it will only re-run the output selector if either posts or userId has changed)
```

**createSelector** takes one or more "input selector" functions as argument, plus an "output selector" function. When we call selectPostsByUser(state, userId), createSelector will pass all the arguments into each of our input selectors. Whatever those input selectors return becomes the arguments for the output selector.  
If we try calling selectPostsByUser multiple times, it will _only_ re-run the output selector if either posts or userId has changed.  
<br/>


## 2) NORMALIZATION

**NORMALIZED STATE** means that:
 - We only have **one copy** of each particular piece of data in our state, so there's no duplication
 - Data that has been normalized is kept in a **lookup table**, where the item IDs are the keys, and the items themselves are the values.
 - There may also be an **array of all the IDs** for a particular item type.
EXAMPLE:
```
{
  users: {
    ids: ["user1", "user2", "user3"],
    entities: {
      "user1": {id: "user1", firstName, lastName},
      "user2": {id: "user2", firstName, lastName},
      "user3": {id: "user3", firstName, lastName},
    }
  }
}
```
[react\redux-saga\redux-essentials-example-app\src\features\posts\postsSlice.js](..%5Creact%5Credux-saga%5Credux-essentials-example-app%5Csrc%5Cfeatures%5Cposts%5CpostsSlice.js)  
<br/>

Redux Toolkit's **createEntityAdapter** API provides a standardized way to store your data in a slice by taking a **collection** of items and putting them into the shape of { ids: [], entities: {} }. Along with this predefined state shape, it generates a set of **reducer** functions and selectors that know how to work with that data. This has several benefits:
 - **We don't have to write** the code to manage the normalization ourselves
 - createEntityAdapter's **pre-built reducer functions** handle common cases like "add all these items", "update one item", or "remove multiple items"
 - createEntityAdapter can keep the **ID array** in a sorted order based on the contents of the items, and will only update that array if items are added / removed or the sorting order changes.
 - createEntityAdapter accepts an options object that may include a **sortComparer** function, which will be used to keep the item IDs array in sorted order by comparing two items  
  <br/>

> SUMMARY
- Memoized selector functions can be used to **optimize** performance  
  * Redux Toolkit re-exports the **createSelector** function from Reselect, which generates memoized selectors
  * Memoized selectors will **only recalculate** the results if the input selectors return new values
  * Memoization can **skip expensive calculations**, and ensure the same result references are returned  
  <br/>

- There are multiple **patterns** you can use to optimize React component rendering with Redux  
  * **Avoid creating** new object/array references inside of useSelector - those will cause unnecessary re-renders
  * **Memoized selector functions** can be passed to useSelector to optimize rendering
  * useSelector can accept an **alternate comparison function** like shallowEqual instead of reference equality
  * Components can be wrapped in **React.memo()** to only re-render if their props change
  * **List rendering can be optimized** by having list parent components read just an array of item IDs, passing the IDs to list item children, and retrieving items by ID in the children  
<br/>

- **Normalized state structure** is a recommended approach for storing items
  * "Normalization" means **no duplication** of data, and keeping items stored in a lookup table by item ID
  * **Normalized state shape** usually looks like {ids: [], entities: {}}  
<br/>

- Redux Toolkit's **createEntityAdapter** API helps manage normalized data in a slice
  - Item IDs can be kept in sorted order by passing in a **sortComparer** option  
  - The **adapter object** includes:
    - **adapter.getInitialState**, which can accept additional state fields like loading state
    - **Prebuilt reducers** for common cases, like setAll, addMany, upsertOne, and removeMany
    - **adapter.getSelectors**, which generates selectors like selectAll and selectById  
  <br/><br/>

> **Derived state** property - its value depends entirely on another value, stored in state and nothing else. _Should be avoided._  

> **Selectors** shouldn't be used for **asynchronous** operations. They returned a cached value if called again with the same params.