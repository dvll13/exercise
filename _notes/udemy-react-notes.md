RRD **action()** submits data to the BE. We need to have names for the fields in order to be able to extract data. We should use the RRD's `<Form method="post">` element to let RRD handle submission and call the action.

Then `export async function action({ request }) { const formData = await request.formData(); const postData = Object.fromEntries(formData); fetch(...); redirect('/') }`.

`**react-router-dom**` will execute the **loader()** function when the route gets activated, just before rendering the element. It is used to **load and prepare any data** that will be used by the **current** route component or the **nested** children components. May be **sync/async**. RRD will **wait** for the promise to resolve before loading the route component.

Then **use loaded data** in the component: `const loadedData = useLoaderData({ params: routeParams })`

**Lifting state up** - moving a shared state from two components up to **their parent.**

tsconfig walkthrough

1.  function App() {
2.    return (
3.      <TodoContextProvider\>
4.        <NewTodo />
5.        <Todos />
6.      </TodoContextProvider\>
7.    )
8.  }

10.  // ---

12.  // interface TodosProps {
13.  //   items: Todo\[\]
14.  //   onRemoveTodo: (id: string) => void
15.  // }

17.  // const Todos: React.FC<TodosProps> = ({ items, onRemoveTodo }) => {
18.  const Todos: React.FC \= () \=> {
19.    const { items, removeTodo } \= use(TodosContext)

21.    return (
22.      <ul className\={classes.todos}>
23.        {items.map((item) \=> (
24.          <TodoItem key\={item.id} text\={item.text} onRemoveTodo\={() \=> removeTodo(item.id)} />
25.        ))}
26.      </ul\>
27.    )
28.  }

1.  interface TodoContext {
2.    items: Todo\[\]
3.    addTodo: (text: string) \=> void
4.    removeTodo: (id: string) \=> void
5.  }

7.  export const TodosContext \= createContext<TodoContext\>({
8.    items: \[\],
9.    addTodo: () \=> {},
10.    removeTodo: (id) \=> {},
11.  })

13.  const TodoContextProvider: React.FC<PropsWithChildren\> \= ({ children }) \=> {
14.    const \[todos, setTodos\] \= useState<Todo\[\]>(\[\])

16.    function handleAddTodo(text: string) {
17.      // setTodos((prev) => \[...prev, new Todo(text)\])
18.      setTodos((prev) \=> prev.concat(new Todo(text)))
19.    }

21.    function handleRemoveTodo(id: string) {
22.      setTodos((prev) \=> prev.filter((todo) \=> todo.id !== id))
23.    }

25.    const contextValue: TodoContext \= {
26.      items: todos,
27.      addTodo: handleAddTodo,
28.      removeTodo: handleRemoveTodo,
29.    }

31.    return <TodosContext.Provider value\={contextValue}>{children}</TodosContext.Provider\>
32.  }

34.  export default TodoContextProvider

Since children prop was removed from React.FC for React >= 18:

  

1.  import type { PropsWithChildren } from 'react'

3.  const TodoItem: React.FC<PropsWithChildren<{ text: string }>> \= (props) \=> {...}

More on Generics follows in the next text lecture.

Generics. `<T>` - a type available to be used only inside of the function.

  

1.  function insertAtBeginning<T\>(array: T\[\], element: T) {
2.      const newArray \= \[element, ...array\];
3.      return newArray;
4.  }

6.  // inferred to: function insertAtBeginning<T>(array: T\[\], element: T): T\[\]

TS is a **superset** to JS (extending its syntax). It doesn't run in the browser so it must be compiled to JS first.

  

JS - **dynamically** typed

TS - **static** types

**Mocking** requests

  

1.  describe('Async component', () \=> {
2.    test('renders posts if request succeeds', async () \=> {
3.      // replace \`fetch\` with a mock fn
4.      window.fetch \= jest.fn()
5.      // set a value this fn should resolve to when being called
6.      window.fetch.mockResolvedValueOnce({
7.        json: async () \=> \[{ id: 'p1', title: 'First post' }\],
8.      })

10.      render(<Async />)

12.      // find\* for async actions; RTL will re-evaluate
13.      // the screen a couple of times before this succeeds
14.      // const listItemEls = await screen.findAllByRole('listitem', {}, {timeout: 1000}) // default timeout
15.      const listItemEls \= await screen.findAllByRole('listitem')
16.      // screen.debug()
17.      expect(listItemEls).not.toHaveLength(0)
18.    })
19.  })

1.    // three AAAs

3.    test('renders "Changed!" if the button WAS clicked', async () \=> {
4.      // Arrange
5.      render(<Greeting />)

7.      // Act
8.      const buttonEl \= screen.getByRole('button')
9.      await userEvent.click(buttonEl)

11.      // Assert
12.      const textEl \= screen.getByText('Changed!')
13.      expect(textEl).toBeInTheDocument()
14.    })

16.    test('does not render "Enjoy your stay!" if the button was clicked', async () \=> {
17.      render(<Greeting />)

19.      const buttonEl \= screen.getByRole('button')
20.      await userEvent.click(buttonEl)

22.      const textEl \= screen.queryByText('Enjoy your stay', { exact: false })
23.      expect(textEl).toBeNull()
24.    })

1.  describe('Greeting component', () \=> {
2.    test('renders Hello World as a text', () \=> {
3.      render(<Greeting />)
4.      //   screen.getByText(/hello world/i)
5.      //   screen.getByText('Hello world', { exact: false })
6.      const helloWorldEl \= screen.getByText('Hello World!')

8.      //   expect(helloWorldEl).not.toBeInTheDocument();
9.      expect(helloWorldEl).toBeInTheDocument()
10.    })

12.    test('renders "your stay" if the button was NOT clicked', () \=> {
13.      render(<Greeting />)
14.      const outputEl \= screen.getByText('your stay', { exact: false })
15.      expect(outputEl).toBeInTheDocument()
16.    })
17.  })

*   **Unit tests** - test the individual **building blocks** (functions, components) in **isolation**
    
*   **Integration tests** - test the **combination** of multiple building blocks
    
*   **End-to-End (E2E) tests** - test **complete scenarios / user flows** (as the user would experience them)
    

**Every component** within a **Context API** Provider, **that uses** `**useContext()**` **will re-render when we switch something in the context**, no matter if it's directly effected or not.

It's good only for **light** usages, not high-frequency ones.

**Pass** a render function to a **child** as a prop, to help it **render** an element by a specified by the parent way.

  

1.  export default function SearchableList({ items, itemKeyFn, children }) {
2.    const \[searchTerm, setSearchTerm\] \= useState('')

4.    const searchResults \= items.filter(
5.      (item) \=> searchTerm !== '' && JSON.stringify(item).toLowerCase().includes(searchTerm),
6.    )

8.    function handleChange(e) {
9.      setSearchTerm(e.target.value)
10.    }

12.    return (
13.      <div className\="searchable-list"\>
14.        <input type\="search" placeholder\="Search..." onChange\={handleChange} value\={searchTerm} />
15.        <ul>
16.          {searchResults.map((item, i) \=> (
17.            <li key\={itemKeyFn()}>{children(item)}</li\>
18.          ))}
19.        </ul\>
20.      </div\>
21.    )
22.  }

24.  // --- Usage:

26.  <SearchableList items\={PLACES} itemKeyFn\={(item) \=> item.id}>
27.    {(item) \=> <Place item\={item} />}
28.  </SearchableList\>
29.  <SearchableList items\={\['item 1', 'item 2'\]} itemKeyFn\={(item) \=> item}>
30.    {(item) \=> item}
31.  </SearchableList\>

  

1.  <Accordion className\="accordion"\>
2.    <Accordion.Item id\="i1" className\="accordion-item"\>
3.      <Accordion.Title className\="accordion-item-title"\>We got 20 years of experience</Accordion.Title>
4.      <Accordion.Content className\="accordion-item-content"\>
5.        <article>
6.          <p>You can't go wrong with us</p>
7.          <p>dyra byra sto chadyra dyra byra sto chadyra dyra byra sto chadyra </p>
8.        </article>
9.      </Accordion.Content>
10.    </Accordion.Item>
11.  ...

1.  export default function AccordionTitle({ className, children }) {
2.    const { toggleItem } \= useAccordionContext()
3.    const id \= useAccordionItemContext()

5.    function handleClick() {
6.      toggleItem(id)
7.    }

9.    return (
10.      <h3 onClick\={handleClick} className\={className}>
11.        {children}
12.      </h3\>
13.    )
14.  }

1.  const AccordionItemContext \= createContext()

3.  export function useAccordionItemContext() {
4.    const ctx \= useContext(AccordionItemContext)

6.    if (!ctx) {
7.      throw new Error('AccordionItem-related components must be wrapped by <Accordion.Item>')
8.    }

10.    return ctx
11.  }

13.  export default function AccordionItem({ id, children, className }) {
14.    return (
15.      <AccordionItemContext.Provider value\={id}>
16.        <li className\={className}>{children}</li\>
17.      </AccordionItemContext.Provider\>
18.    )
19.  }

1.  const AccordionContext \= createContext()

3.  export function useAccordionContext() {
4.    const ctx \= use(AccordionContext)

6.    if (!ctx) {
7.      throw new Error('Accordion-related components must be wrapped by <Accordion>')
8.    }

10.    return ctx
11.  }

13.  export default function Accordion({ children, className }) {
14.    const \[openItemId, setOpenItemId\] \= useState(null)

16.    function toggleItem(id) {
17.      setOpenItemId((prevId) \=> (id \=== prevId ? null : id))
18.    }

20.    const contextValue \= {
21.      openItemId,
22.      toggleItem,
23.    }

25.    return (
26.      <AccordionContext.Provider value\={contextValue}>
27.        <ul className\={className}>{children}</ul\>
28.      </AccordionContext.Provider\>
29.    )
30.  }

32.  Accordion.Item \= AccordionItem
33.  Accordion.Title \= AccordionTitle
34.  Accordion.Content \= AccordionContent

**Compound components** - components that **work together** in conjunction, e.g. Select and Options, According and its Items.

  

_Accordion example_

1.  const { scrollY } \= useScroll()
2.  // doesn't case re-render
3.  const yCity \= useTransform(scrollY, \[0, 200\], \[0, \-100\])
4.  const opacityCity \= useTransform(scrollY, \[0, 200, 300, 500\], \[1, 0.5, 0.5, 0\]) // transform y to opacity
5.  const yHero \= useTransform(scrollY, \[0, 200\], \[0, \-150\])
6.  const opacityHero \= useTransform(scrollY, \[0, 300, 500\], \[1, 1, 0\])
7.  const yText \= useTransform(scrollY, \[0, 200, 300, 500\], \[0, 50, 50, 300\])
8.  const scaleText \= useTransform(scrollY, \[0, 300\], \[1, 1.5\])

10.  <motion.div style\={{ scale: scaleText, y: yText }} id\="welcome-header-content"\>
11.    <h1>Ready for a challenge?</h1\>
12.    <Link id\="cta-link" to\="/challenges"\>
13.      Get Started
14.    </Link\>
15.  </motion.div\>
16.  <motion.img
17.    style\={{ opacity: opacityCity, y: yCity }} // special kind of style prop, FM animates it
18.    src\={cityImg}
19.    alt\="A city skyline touched by sunlight"
20.    id\="city-image"
21.  />
22.  <motion.img
23.    style\={{ opacity: opacityHero, y: yHero }}
24.    src\={heroImg}
25.    alt\="A superhero wearing a cape"
26.    id\="hero-image"
27.  />

`const { scrollY } = useScroll()` - **listen for scroll events** and detect **how far the user has scrolled**.

`useTransform(value, breakpoints, translatedBreakpointsValues)` - allows us to **transform values**, to values used in **animations**.

Setting a **key** to a component causes it to **re-create** on change of the key, and that makes the **animations run again**.

1.  <Badge key\={badgeCaption} caption\={badgeCaption}\></Badge> // so that we re-trigger entry animation on caption change

Moving the Tab underline element on tab change by animation - **layoutId**. Each tab has its own indicator, but they all share the same layoutId. So whenever **we're rendering another element with the same layoutId** on a different place in our page FM will automatically play a **smooth animation**.

  

1.  {isSelected && <motion.div layoutId\="tab-indicator" className\="active-tab-indicator" />}

**Fix** list item appearing/disappearing smoothness

  

1.  <AnimatePresence>
2.    {isExpanded && (
3.      <motion.div
4.        initial\={{ height: 0, opacity: 0 }}
5.        animate\={{ height: 'auto', opacity: 1 }}
6.        exit\={{ height: 0, opacity: 0 }}
7.      \>
8.        <p className\="challenge-item-description"\>{challenge.description}</p>
9.      </motion.div>
10.    )}
11.  </AnimatePresence>

If we use AnimatePresence and have **more than one direct child elements for animating**, we should **add keys** to help FM tell them apart.

**Layout**

_parent:_

1.  export function Challenges() {
2.    return (
3.      <AnimatePresence mode\='wait'\> // wait for the first element to disappear before anim-showing the next
4.        {displayedChallenges.length \> 0 && (
5.          <motion.ol exit\={{ y: \-30, opacity: 0 }} key\="list"\>
6.            <AnimatePresence\>
7.              {displayedChallenges.map((challenge) \=> (
8.                <ChallengeItem />
9.              ))}
10.            </AnimatePresence\>
11.          </motion.ol\>
12.        )}

14.        {displayedChallenges.length \=== 0 && (
15.          <motion.p
16.            key\="fallback"
17.            initial\={{ opacity: 0, y: \-20 }}
18.            animate\={{ opacity: 1, y: 0 }}
19.            exit\={{ opacity: 0, y: \-20 }}
20.          \>
21.            No challenges found.
22.          </motion.p\>
23.        )}
24.      </AnimatePresence\>
25.    )
26.  }

  

_child:_

1.  export function ChallengeItem() {
2.    return (
3.      // animate layout changes in the element
4.      <motion.li layout exit\={{ y: \-30, opacity: 0 }}> // slide up and fade on remove
5.    )
6.  }

Imperative animations

1.  export default function NewChallenge({ onDone }) {
2.    const \[scope, animate\] \= useAnimate() // ref for the container el for the animate() selector; imperative trigger

4.    function handleSubmit(event) {
5.      if (!challenge.title.trim() || !challenge.description.trim() || !challenge.deadline.trim() || !challenge.image) {
6.        animate(
7.          'input, textarea', // css selector
8.          { x: \[-10, 0, 10, 0\] }, // animation
9.          { type: 'spring', duration: 0.2, delay: stagger(0.1) }, // transition
10.        )
11.        return
12.      }

14.      ...
15.    }

17.    return (
18.      <form id\="new-challenge" onSubmit\={handleSubmit} ref\={scope}>
19.    )
20.  }

  

1.  visible: { opacity: 1, scale: \[0.8, 1.3, 1\] }, // using array -> anim keyframes

Parent element variants can be used in children as well. The parent triggers them and the child component automatically runs the animation for that variant.

_NewChallenge.js (_**_child_** _of the modal from the previous note; each variant will be triggered on parent variant change)_

1.  <motion.ul id\="new-challenge-images" variants\={{ visible: { transition: { staggerChildren: 0.1 } } }}\>
2.  {images.map((image) => (
3.    <motion.li
4.      // get triggered by the parent variants change
5.      variants\={{
6.        hidden: { opacity: 0, scale: 0.5 },
7.        visible: { opacity: 1, scale: 1 },
8.      }}
9.      // exit\="visible" // (not working) override workaround so that we don't have to wait for the hidden animation on these images to finish before hiding the modal
10.      transition={{ type: 'spring' }}
11.    >
12.      <img {...image} />
13.    </motion.li>
14.  ))}
15.  </motion.ul>

  

**transition** is applied to only the current element.

**staggerChildren** - load children animations **one-after-another** with the specified delay between them

**Reusing** animation states through **variants.** Could be r**eused in other props** as well, e.g. `whileHover='hidden'`, etc.

The variants are also **accessible** from the wrapped **children** by that component.

  

1.  <motion.dialog
2.    variants\={{
3.      hidden: { opacity: 0, y: 30 },
4.      visible: { opacity: 1, y: 0 },
5.    }}
6.    initial\="hidden"
7.    animate\="visible"
8.    exit\="hidden"
9.    ...
10.  \>
11.    ...
12.  </motion.dialog>

Button hover effect

  

1.  <motion.button
2.    whileHover\={{ scale: 1.1, backgroundColor: '#8b11f0' }} // color also 'bounces'
3.    transition\={{
4.      type: 'spring',
5.      stiffness: 500, // bounce-related settings
6.      // mass: 10, // bounce-related settings
7.      // duration: 0.3,
8.    }}
9.    ...
10.  \>
11.    Add Challenge
12.  </motion.button>

Since the element is directly added to the DOM and we have no open prop to rely on:

  

1.  <AnimatePresence>
2.    {isCreatingNewChallenge && <Modal onDone\={handleDone} />}
3.  </AnimatePresence>

5.  // ... Modal.js:

7.  <motion.dialog
8.    initial\={{ opacity: 0, y: 30 }} // start from these values on element add to the DOM
9.    animate\={{ opacity: 1, y: 0 }} // animate to these immediately after the element appears
10.    exit\={{ opacity: 0, y: 30 }} // the state we want to animate to when the el is removed from the DOM
11.    open\>
12.    ...
13.  </motion.dialog>

  

**AnimatePresence** wrapper - checks the wrapped elements if there's `exit`  animation code and if so, it'll execute it first before removing them. Without that wrapper the elements are directly removed by React and we can't play exit animations.

**framer-motion** uses natural, nice and realistic animations to move/change elements. They get any prop change transitions animated.

  

1.  import { motion } from 'framer-motion'

3.  function App() {
4.    const \[x, setX\] \= useState(0)
5.    const \[y, setY\] \= useState(0)
6.    const \[rotate, setRotate\] \= useState(0)

8.    return (
9.      <div id\="demo"\>
10.        {/\* <div id="box" /> \*/}
11.        <motion.div id\="box" animate\={{ x, y, rotate }} />
12.     ...

  

_More prominent_ **_props_**_:_

`animate` - animates element props

`transition` - configures the animation

_Animated icon rotation by_ **_transition_** _example_

  

1.  .challenge\-item\-details\-icon {
2.    ...
3.    transition: transform 0.3s ease\-out; // or \`transition: all ...\` for all props
4.  }

6.  .challenge\-item\-details.expanded .challenge\-item\-details\-icon {
7.    transform: rotate(180deg);
8.  }

10.  // ... OR with framer-motion

12.  <motion.span className\="challenge-item-details-icon" animate\={{rotate: isExpanded ? 180 : 0}}>&#9650;</motion.span\>

_Modal slide-up-fade-in_ **_animation_** _example_

  

1.  @keyframes slide\-up\-fade\-in {
2.    0% { // or \`from\`
3.      transform: translateY(30px);
4.      opacity: 0;
5.    }
6.    100% { // or \`to\`
7.      transform: translateY(0);
8.      opacity: 1;
9.    }
10.  }

12.  .modal {
13.    ...
14.    animation: slide\-up\-fade\-in 0.3s ease\-in forwards;
15.  }

17.  // forwards - the final animation property values are maintained after the animation completes

  

The modal is added/removed from the DOM by a state prop. So we can animate its appearance, but **not its disappearance**. For such a case we can use the Framer Motion.

**ErrorBoundary** + Suspense + DataFetchingPromiseComponent example

1.  // Home.js
2.  export default function Home() {
3.    const fetchUserPromise \= new Promise(resolve \=>
4.      setTimeout(async () \=> {
5.        const data \= await fs.readFile('dummy-db.json', 'utf-8')
6.        const users \= JSON.parse(data)
7.        resolve(users)
8.      }, 2000)
9.    )

11.    return (
12.      <main>
13.        <Suspense fallback\='Loading users...'\>
14.          <UsePromisesDemo usersPromise\={fetchUsersPromise} />
15.        </Suspense\>
16.      </main\>
17.    )
18.  }

21.  // UsePromisesDemo.js

23.  'use client'

25.  export default async function UsePromisesDemo ({usersPromise}) {
26.    const users \= use(usersPromise)
27.    const \[...\] \= useState()
28.    ...
29.  }

`use()` - except for getting access to Context, it can be used to **await promises in client-components**. Can work together with **Suspense** to handle data fetching and loading fallbacks. \`Use\` works only with promises created by libraries that integrate with the Suspense feature. NextJS gives us such an option. Demo ... ->

It's a good practice to **extract** Server Actions functions to a common file with a `'use server'`directive on top. e.g. `/lib/actions.ts`

You can **test if a component/fn is Server-Side or Client-Side** by adding a `console.log()` in it and checking if it appears in the browser's console.

We can add `'use server'` directive in a Form Action function and make it async **to turn it into a Server Action** (which is a Form Action, **executed on the server**, not on the client-side).

**RSC can include CC** in their JSX code

**CC can't directly include RSC** in their code (NextJS **converts** the latter to CC in such case; if we convert the RSC to async component, which is allowed for RSC, then it won't be converted and we'll have an error) - they can **only as**  `children`

React Server Components vs Client Components

RSC are never **executed on the client**; less code is sent to the client

CC are **pre-rendered on the server and rendered on the client as well**; use client functionalities like \`useState\` etc.

A project with the older **Pages Router** (alt to the App Router)

It might be **dangerous not to test our app in Production mode**. (e.g. because of the aggressive caching, missing data /images/)

NextJS Module **Summary**

**Dynamic Metadata**

  

1.  // we are using an async fn
2.  // which receives the same data as our component,
3.  // so we can use that to generate the metadata
4.  export async function generateMetadata({ params }) {
5.    const { mealSlug } \= await params
6.    const meal \= getMeal(mealSlug)

8.    if (!meal) {
9.      notFound() // metadata is run before the component so we should check here too
10.    }

12.    return {
13.      title: meal.title,
14.      description: meal.summary,
15.    }
16.  }

If `export const metadata = {}`  is added to a `layout` page, then it gets **applied to all nested pages**. If it's added to a `page` then it's used **only for it** (and takes **precedence** over the layout's metadata. Any nested metadata wins over the root's metadata.

  

1.  export const metadata \= {
2.    title: 'All Meals', // sets page tab title
3.    description: 'Browse the delicious meals, shared by our vibrant community.',
4.  }

You **shouldn't save files locally in the \`public\` folder** during runtime. During build the current state of the public folder gets copied in `.next` folder and the newly added files from the production running system **won't be available** afterwards. For **files added at request time** we should use a **third-party** service like **AWS S3** for persistent file storage. _Example for that can be found on the next lecture._

Trigger a cache **re-validation**: `**revalidatePath(path: string, type: 'page' | 'layout')**`

*   `page` - only the **current** page for this path
    
*   `layout` - **current** page and all **nested** ones
    

`revalidatePath('/', 'layout')` - revalidate **all pages**

  

1.  export async function shareMeal(prevState, formData) {
2.    ...

4.    await saveMeal(meal)
5.    revalidatePath('/meals') // revalidates cache for that path
6.    redirect('/meals')
7.  }

NextJS **pre-generates static pages on build**, and caches them, so they are loaded instantly on visit. This can lead to data not being re-fetched.

Running a **production** build:

1.  npm run build
2.  npm start

_It still loads on http://localhost:3000_

**Server Action Responses** - improving the form error handling. We can return **response objects** too. It's a **serializable** **object**, so it shouldn't include any methods, because they would be lost whilst being sent to the client.

_lib/actions.js_

1.  export async function shareMeal(prevState, formData) {
2.    ...
3.    if (
4.      isInvalidText(meal.title) ||
5.      isInvalidText(meal.summary) ||
6.      isInvalidText(meal.instructions) ||
7.      isInvalidText(meal.creator) ||
8.      isInvalidText(meal.creator\_email) ||
9.      !meal.creator\_email.includes('@') ||
10.      !meal.image ||
11.      meal.image.size \=== 0
12.    ) {
13.      // throw new Error('Invalid input!')
14.      return { message: 'Invalid input' }
15.    }
16.    ...
17.  }

  

_/share/page.js_

1.  export default function ShareMealPage() {
2.    const \[state, formAction\] \= useActionState(shareMeal, { message: null })
3.    ...
4.    <form className\={classes.form} action\={formAction}>
5.      ...
6.      {state.message && <p>{state.message}</p\>}
7.    </form\>
8.  }

  

**Client-side validation isn't enough**, because it could be manipulated by the used, e.g. by the DevTools. That's why we need a **server-side validation** (by a 3rd party package or manual) as well.

_lib/actions.ts_

1.  'use server'

3.  export async function shareMeal(formData) {
4.    const meal \= {
5.      title: formData.get('title'),
6.      summary: formData.get('summary'),
7.      instructions: formData.get('instructions'),
8.      image: formData.get('image'),
9.      creator: formData.get('name'),
10.      creator\_email: formData.get('email'),
11.    }

13.    // validate
14.    if (
15.      isInvalidText(meal.title) ||
16.      isInvalidText(meal.summary) ||
17.      isInvalidText(meal.instructions) ||
18.      isInvalidText(meal.creator) ||
19.      isInvalidText(meal.creator\_email) ||
20.      !meal.creator\_email.includes('@') ||
21.      !meal.image ||
22.      meal.image.size \=== 0
23.    ) {
24.      throw new Error('Invalid input!')
25.    }

27.    await saveMeal(meal)
28.  }

Taking a more **granular** approach with the **form status** (e.g. pending), instead of trying the make the whole form containing component a client one. Since we only want to change the button state and text during a submit, we **extract it into a new component** - MealsFormSubmit.js

  

1.  import { useFormStatus } from 'react-dom'

3.  export default function MealsFormSubmit() {
4.    const { pending } \= useFormStatus()
5.    return <button disabled\={pending}>{pending ? 'Submitting...' : 'Share Meal'}</button\>
6.  }

continued:

  

1.  export async function saveMeal(meal) {
2.    ... \->

4.    // save to db
5.    db.prepare(
6.      \`
7.      INSERT INTO meals
8.        (title, summary, instructions, creator, creator\_email, image, slug)
9.      VALUES (
10.        @title,
11.        @summary,
12.        @instructions,
13.        @creator,
14.        @creator\_email,
15.        @image,
16.        @slug
17.      )
18.    \`,
19.    ).run(meal)
20.    // id gets populated automatically
21.    // this syntax extracts the values from an object. we specify the keys. order matters, should match the cols order
22.    // alternative - VALUES(?, ?, ?, ...)

24.    redirect('/meals')
25.  }

1.  export async function saveMeal(meal) {
2.    meal.slug \= slugify(meal.title, { lower: true }) // create a slug from a value
3.    meal.instructions \= xss(meal.instructions) // sanitize and clean a value

5.    // prepare image
6.    const extension \= meal.image.name.split('.').pop()
7.    const fileName \= \`${meal.slug}.${extension}\` // there should also be a random suffix

9.    // create a file on the filesystem
10.    const stream \= fs.createWriteStream(\`public/images/${fileName}\`) // create a stream that allows us to write data to a file
11.    const bufferedImage \= await meal.image.arrayBuffer()

13.    stream.write(Buffer.from(bufferedImage), (error) \=> {
14.      if (error) {
15.        throw new Error('Saving image failed.')
16.      }
17.    }) // convert from arrayBuffer to a regular buffer then write the latter

19.    meal.image \= \`/images/${fileName}\`

21.   ... \->
22.  }

**Images** must be **stored on a filesystem**, not in the database.

**Adding data to DB** (Creating a Slug and Sanitizing user input for XSS protection)

  

`npm i slugify xss`

*   **slugify** \- create a slug from a name
    
*   **xss** - protects from XSS attacks
    

**Server action** \- an async function, that's guaranteed to be executed on the server. Used for direct handling of **form submissions**.

_lib/actions.js_

1.  'use server'

3.  async function shareMeal(formData) {
4.    const meal \= {
5.      title: formData.get('title'),
6.      summary: formData.get('summary'),
7.      instructions: formData.get('instructions'),
8.      image: formData.get('image'),
9.      creator: formData.get('name'),
10.      creator\_email: formData.get('email'),
11.    }

13.    console.log(meal)
14.  }

16.  ...

18.  // SomeComponent.js
19.  <form className\={classes.form} action\={shareMeal}>

  

That **won't work** in a **client component** though. So server action functions could be **extracted** instead to a separate file (e.g. /lib/actions.js) that has one 'use server' directive on top for all.

**Data URL** - value that can be used as a src for an img element

_Image.Picker.js:_

1.  const \[pickedImage, setPickedImage\] \= useState()

3.  const imageInputRef \= useRef()

5.  function handlePickClick() {
6.    imageInputRef.current.click()
7.  }

9.  function handleImageChange(event) {
10.    const file \= event.target.files\[0\]

12.    if (!file) {
13.      setPickedImage(null)
14.      return
15.    }

17.    // generate Data URL
18.    const fileReader \= new FileReader()

20.    fileReader.onload \= () \=> {
21.      setPickedImage(fileReader.result)
22.    }
23.    fileReader.readAsDataURL(file)
24.  }

**Image picker** jsx:

1.  <div className\={classes.picker}\>
2.    <label htmlFor\={name}\>{label}</label>
3.    <div className\={classes.controls}\>
4.      <div className\={classes.preview}\>
5.        {!pickedImage && <p>No image picked yet.</p>}
6.        {pickedImage && <Image src\={pickedImage} alt\="Picked image by the user" fill />}
7.      </div>
8.      <input
9.        type\="file"
10.        id\={name}
11.        name\={name}
12.        accept\="image/png, image/jpeg"
13.        // multiple
14.        className\={classes.input}
15.        ref\={imageInputRef}
16.        onChange\={handleImageChange}
17.        required
18.      />
19.      <button type\="button" className\={classes.button} onClick\={handlePickClick}\>
20.        Pick an Image
21.      </button>
22.    </div>
23.  </div>

Programmatically **navigate to a reserved filename**:

  

1.  import { notFound } from 'next/navigation'

3.  if (!meal) {
4.    notFound() // will stop the component from execution and show the closest not-found or error page
5.  }

1.  export function getMeal(slug) {
2.    // return db.prepare('SELECT \* FROM meals WHERE name = ' + slug) // insecure, we open ourself to SQL injection
3.    return db.prepare('SELECT \* FROM meals WHERE name = ?').get(slug) // secure. "?" -> placeholder for the param
4.  }

1.  // output HTML. dangerous because you open yourself to XSS attacks 
2.  <p dangerouslySetInnerHTML\={{ \_\_html: '...' }}></p\>

_error.js_

1.  'use client'

3.  export default function MealsErrorPage() {
4.    return (
5.      <main className\="error"\>
6.        <h1>An error occurred.</h1\>
7.        <p>Please try again later.</p\>
8.      </main\>
9.    )
10.  }

  

It must be a **client component** since it should catch also client-side errorrs.

A **more granular way of loading** state management - **extract** the fetching function (returning a promise) in a separate async component and then use that component, **wrapped in a <Suspense**\>. Good for a partial loading indicator.

  

1.  async function Meals() {
2.    const meals \= await getMeals()
3.    return <MealsGrid meals\={meals} />
4.  }

6.  export default function MealsPage() {
7.    return (
8.      ...
9.      <Suspense fallback\={<p className\={classes.loading}>Fetching meals...</p\>}>
10.        <Meals />
11.      </Suspense\>
12.    )
13.  }

**loading.js** example

better-sqlite3 is **synchronous**.

Although we can make our components **async**.

/lib/meals.js

1.  import sql from 'better-sqlite3'

3.  // establish a connection to the db
4.  const db \= sql('meals.db')

6.  export function getMeals() {
7.    // .run() - for inserting/changing data
8.    // .all() - for fetching data, return all rows that are fetched by the statement
9.    // .get() - for fetching a single row

11.    return db.prepare('SELECT \* FROM meals').all() // prepare a new sql statement
12.  }

  

SomeComponent.js:

1.  const meals \= getMeals()

`npm i **better-sqlite3**`

<Image ... **fill**/> - a prop used when we don't know the image dimensions (e.g. when they are loaded dynamically from a database and we are unaware of their dimensions, instead of imported from a local assets folder). It's because this information is not available on build time, but on run time.

The prop tells nextjs to fill the available space with this image.

Marking a navigation link as active:

1.  'use client'

3.  const path \= usePathname()

5.  ...

7.  <Link href\="/meals" className\={path.startsWith('/meals') ? classes.active : undefined}>
8.    Browse Meals
9.  </Link\>

  

So nav link is a good candidate for **extraction**, so we don't make the components that use it client-side. Instead we make only the NavLink like that.

Components with **useState,** **useEffect** hooks and event handlers must be **client-side**. That's because they would require code that runs on the client.

  

To make a component a **Client Component** we should add this directive at the top (that would allow us to use client-side features):

`'use client'`

We should add this directive to the tree **as low as possible**, since we want most of our components to be Server-side.

**React Server Components vs Client Components**

*   **RSC** - In nextjs by default all components are rendered on the server (so you won't see console.logs in the browser, but in the BE terminal). The advantage is **less client-side JS**, **great for SEO** (all content is loaded and that's what web search crawlers will see).
    
*   **CC** - Components are **pre-rendered** on the server, but then also **potentially on the client**. Advantage: **client-side interactivity**.
    

Custom **Slideshow** component

Nextjs **<Image />** element. Recommended to be used for images. Can automatically **lazy load** images, so they get only displayed if they are visible on the page. Can be also used to simplify the setting of **responsive** images and so on.

Adds additional attributes to the rendered <img/> element in the browser, including inferred **width/height**, **srcset** so differently **sized** images, and image **file formats** are loaded depending on the viewport and device, and so on.

**priority** prop - tells nextjs that this image should be always visible on page load (**above the fold** - the top part of a webpage or newspaper front page seen immediately without scrolling or unfolding. Key elements include the **hero banner**, **main headline**, and **logo/branding**), so it should always be loaded as quickly as possible, so there won't be any content shifting and flickering.

**Dynamic routes** - \[some\_placeholder\]. E.g.:

  

/app/blog/\[slug\]/page.js:

1.  // http://localhost:3000/blog/post-1

3.  export default async function BlogPostPage({ params }) {
4.    const { slug } \= await params
5.    // slug -> post-1

7.    return (
8.      <main>
9.        <h1>Blog post</h1\>
10.        <p>{slug}</p\>
11.      </main\>
12.    )
13.  }

1.  import Header from '@/components/Header' // @ - refers to the project's root folder (set in the jsconfig.json by default)

**icon.png** - an image with the name \`icon\` is considered as a **favicon** by nextjs. no need to be additionally imported or set anywhere.

example root layout.js:

  

1.  import './globals.css' // gets available in all pages

3.  // reserved name, used for the <head/> content to set metadata fields,
4.  // instead of using a <head> tag in the jsx
5.  export const metadata \= {
6.    title: 'NextJS Course App',
7.    description: 'Your first NextJS app!',
8.  }

10.  // children is the page.js content
11.  export default function RootLayout({ children }) {
12.    return (
13.      <html lang\="en"\>
14.        <body>{children}</body\>
15.      </html\>
16.    )
17.  }

We need **at least one** root **layout.js** file.

Apart from that we could **nest** them

<a href="...>...</a> - reloads the page, we **loose** the SPA functionality

  

so instead we should use:

1.  <Link href\="/about"\>About us</Link>

  

This way the content is still **rendered on the server** and sent to the client, but is afterwards rendered in the browser by client-side JS code.

App Router

Important: These filenames are only reserved when creating them inside of the `app/` folder (or any subfolder). Outside of the `app/` folder, these filenames are not treated in any special way.

  

*   `page.js` => Create a new page (e.g., `app/about/page.js` creates a `<your-domain>/about` page)
    
*   `layout.js` => Create a new layout that wraps sibling and nested pages
    
*   `not-found.js` => Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)
    
*   `error.js` => Fallback page for other errors (thrown by sibling pages or nested pages or layouts)
    
*   `loading.js` => Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data
    
*   `route.js` => Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)
    

  

More info on routes and folder structure: https://nextjs.org/docs/app/getting-started/project-structure

`npx create-next-app@latest app-name`

useQuery({ **staleTime**: 10000 }) could be added to avoid duplicate requests from TQ and RR

1.  export default function EditEvent() {
2.    const submit \= useSubmit()

4.    function handleSubmit(formData) {
5.      // trigger the action
6.      submit(formData, { method: 'PUT' }) // all but 'GET' would trigger the action
7.    }
8.  }

10.  // triggers on form submit
11.  // alt approach that would replace the Optimistic Update approach from the component
12.  export async function action({ request, params }) {
13.    const formData \= await request.formData()
14.    const updatedEventData \= Object.fromEntries(formData)

16.    await updateEvent({ id: params.id, event: updatedEventData }) // from utils/http.js
17.    await queryClient.invalidateQueries(\['events'\])

19.    return redirect('../') // to the parent page
20.  }

Fetching last 3 events:

1.  const { data, isPending, isError, error } \= useQuery({
2.    queryKey: \['events', { max: 3 }\], // used to cache data so response could be reused later elsewhere
3.    // queryFn: ({ signal, queryKey }) => fetchEvents({ signal, max: 3 }),
4.  })
5.    queryFn: ({ signal, queryKey }) \=> fetchEvents({ signal, ...queryKey\[1\] }),
6.  })

1.  const formattedDate \= new Date(data.date).toLocaleDateString('bg-BG', {
2.    day: 'numeric',
3.    month: 'short',
4.    year: '2-digit',
5.  })

**useMutation()** - used when we want to modify data (e.g. by POST requests) and is sent manually by us unlike useQuery()

  

1.    const { mutate, isPending, isError, error } \= useMutation({
2.      mutationFn: createNewEvent,
3.      onSuccess: () \=> {
4.        queryClient.invalidateQueries({ queryKey: \['events'\] }) // marks all events including the key 'events' as stale, so their data will be re-fetched when we visit a component that uses it
5.       // queryClient.invalidateQueries({ queryKey: \['events'\], exact: true }) // this way only queries with exactly that key would be invalidated
6.        navigate('/events')
7.      },
8.    })

10.    function handleSubmit(formData) {
11.      mutate({ event: formData }) // data format depends on the BE requirements
12.    }

TQ passes by default an object with params to our **queryFn,** like **queryKey** (which we may wanna **use** in our data fetching function) and **signal (**which could be used to **abort** the request)

  

The signal could be passed to our fetch fn and to the browser, so it could internally stop the request if needed

1.  queryFn: ({ signal }) \=> fetchEvents({ signal, searchTerm }),

1.  export async function fetchEvents({ signal, searchTerm }) {
2.    const response \= await fetch(url, { signal })
3.    ...
4.  }

  

**Dynamic Query functions and Query keys:**

  

1.  const \[searchTerm, setSearchTerm\] \= useState()

3.  const { data, isPending, isLoading, isError, error } \= useQuery({
4.    queryKey: \['events', { search: searchTerm }\],
5.    queryFn: () \=> fetchEvents(searchTerm),
6.    enabled: searchTerm !== undefined // while initially \`false\` then it's treated as \`pending\` since TQ is waiting for this query to be enabled; \`isLoading\` is true on the other hand only while the request is being processed
7.  })

Distributed computing - holding the same state in two different places: on the client and the server. TQ tries to make this inherent architectural friction as painless as possible by acting as an intelligent asynchronous layer.

Instead of using a bunch of manual fetches tied to `useState` updates, along with fragile `isLoading` flags and complex state synchronization logic, TQ abstracts the heavy lifting of API responses, background updates, and request deduplication into a few elegant hooks. You tell TQ where to get the data, and it uses a pattern known as “stale-while-revalidate,” which means it will cache and reuse data on the front end (eliminating reload waits) and sync to the latest state in the background.

The catch, however, is that cache invalidation remains one of the hardest problems in computer science—and TQ forces you to face it head-on. You will spend time thinking about “query keys” and deciding when a piece of data should be considered “stale.” No free lunches in software.

**Caching**

  

TQ caches the **response** data, the browser caches the **images**.

The cached data is immediately shown, while TQ triggers a **behind-the-scenes request** to check for data updates, and if so, updates the result if needed when the response arrives.

  

**Caching configs:**

1.  useQuery({
2.    ...
3.    staleTime: 60000, // don't send a behind-the-scenes request if 60 secs haven't passed from the last request
4.    gcTime: 120000 // garbage collecting time \[defaults to 5 mins\]. defines how long the data and the cache will be kept around
5.  })

1.  function App() {
2.    const queryClient \= new QueryClient()

4.    // eslint-disable-next-line react-hooks/immutability
5.    // window.\_\_TANSTACK\_QUERY\_CLIENT\_\_ = queryClient // not required: if we want to use tenstack devtools

7.    return (
8.      <QueryClientProvider client\={queryClient}>
9.        <RouterProvider router\={router} />
10.        <ReactQueryDevtools initialIsOpen\={false} /> // optional
11.      </QueryClientProvider\>
12.    )
13.  }

15.  const { data, isPending, isError, error } \= useQuery({
16.    queryKey: \['events'\], // used to cache data so response could be reused later elsewhere
17.    queryFn: fetchEvents,
18.  })

**Tanstack Query** - less code, caching, behind-the-scenes data fetching (partial)

**auto-refetches** when we switch to another tab and then back to the app

uses **our** fetch/axios functions for requests

\`**npm run build**\` - create an optimized and transformed version of the app for production

1.  // lazy loading a component and a loader function. instead of importing it, do:
2.  // import BlogPage, { loader } from './pages/Blog'

4.  import { lazy, Suspense} from 'react'

6.  const BlogPage \= lazy(() \=> import('./pages/Blog'))

8.  {
9.    index: true,
10.    element: (
11.      <Suspense fallback\={<p\>Loading...</p\>}>
12.        <BlogPage />
13.      </Suspense\>
14.    ),
15.    loader: (meta) \=> import('./pages/Blog').then(module \=> module.loader(meta))
16.  }/

  

token expiration part 2:

  

1.  // Root.js

3.  function RootLayout() {
4.    const token \= useLoaderData()
5.    const submit \= useSubmit()

7.    useEffect(() \=> {
8.      if (!token) return

10.      if (token \=== 'EXPIRED') {
11.        return submit(null, { action: '/logout', method: 'POST' })
12.      }

14.      const tokenDuration \= getTokenDuration()

16.      setTimeout(() \=> {
17.        submit(null, { action: '/logout', method: 'POST' })
18.      }, tokenDuration)
19.    }, \[submit, token\])

21.    ...
22.  }

24.  // Logout.js

26.  export function action() {
27.    localStorage.removeItem('token')
28.    localStorage.removeItem('expiration')
29.    return redirect('/')
30.  }

Adding **token expiration:**

1.  // Authentication.js

3.  localStorage.setItem('token', token)
4.  const expiration \= new Date()
5.  expiration.setHours(expiration.getHours() + 1) // expire in 1 hour
6.  localStorage.setItem('expiration', expiration.toISOString())

8.  // util.js

10.  export function getTokenDuration() {
11.    const storedExpirationDate \= localStorage.getItem('expiration')
12.    const expirationDate \= new Date(storedExpirationDate)
13.    const now \= new Date()
14.    const duration \= expirationDate.getTime() \- now.getTime()

16.    return duration
17.  }

19.  export function getAuthToken() {
20.    const token \= localStorage.getItem('token')
21.    const tokenDuration \= getTokenDuration()

23.    if (!token) return null

25.    if (tokenDuration < 0) {
26.      return 'EXPIRED'
27.    }

29.    return token
30.  }

1.  // --- util.js

3.  export function tokenLoader() {
4.    return getAuthToken()
5.  }

7.  // --- App.js

9.  const router \= createBrowserRouter(\[
10.    {
11.      path: '/',
12.      element: <RootLayout />,
13.      errorElement: <ErrorPage />,
14.      id: 'root',
15.      loader: tokenLoader, // will be checked when any navigation action occurs
16.      children: \[...\]
17.    }
18.  \])

20.  // --- MainNavigation.js

22.  function MainNavigation() {
23.    const token \= useRouteLoaderData('root')
24.    ...
25.  }

  

Logout action:

  

1.  // logout action (pages/Logout.js)
2.  export function action() {
3.    localStorage.removeItem('token')
4.    localStorage.removeItem('expiration')
5.    return redirect('/')
6.  }

8.  // logout route (App.js)
9.  import { action as logoutAction } from './pages/Logout'
10.  { path: 'logout', action: logoutAction },

13.  // logout button (MainNavigation.js)
14.  <Form action\="/logout" method\="post"\>
15.    <button>Logout</button\>
16.  </Form\>

1.  export async function action({ request, params }) {
2.    const method \= request.method
3.    const data \= await request.formData()

5.    const eventData \= {
6.      title: data.get('title'),
7.      image: data.get('image'),
8.      date: data.get('date'),
9.      description: data.get('description'),
10.    }

12.    let url \= 'http://localhost:8080/events'

14.    if (method \=== 'PATCH') {
15.      const eventId \= params.eventId
16.      url \= 'http://localhost:8080/events/' + eventId
17.    }

19.    const token \= getAuthToken()

21.    const response \= await fetch(url, {
22.      method: method,
23.      headers: {
24.        'Content-Type': 'application/json',
25.        Authorization: 'Bearer ' + token,
26.      },
27.      body: JSON.stringify(eventData),
28.    })

30.    if (response.status \=== 422) {
31.      return response
32.    }

34.    if (!response.ok) {
35.      throw json({ message: 'Could not save event.' }, { status: 500 })
36.    }

38.    return redirect('/events')
39.  }

1.  export async function action({ request }) {
2.    const searchParams \= new URL(request.url).searchParams
3.    const mode \= searchParams.get('mode') || 'login'

5.    if (mode !== 'login' && mode !== 'signup') {
6.      throw new Response({ message: 'Unsupported mode' }, { status: 422 })
7.    }

9.    const data \= await request.formData()
10.    const authData \= {
11.      email: data.get('email'),
12.      password: data.get('password'),
13.    }

15.    const response \= await fetch('http://localhost:8080/' + mode, {
16.      method: 'POST',
17.      header: { 'Content-Type': 'application/json' },
18.      body: JSON.stringify(authData),
19.    })

21.    if (response.status \=== 422 || response.status \=== 401) {
22.      return response // we can return responses, react router will auto extract the data from the response
23.    }

25.    if (!response.ok) {
26.      throw new Response({ message: '..' }, { status: 500 })
27.    }

29.    const resData \= await response.json()
30.    const { token } \= resData

32.    localStorage.setItem('token', token)

34.    return redirect('/') // to starting page
35.  }

How **Auth** in React apps work

1.    const { event, events } \= useRouteLoaderData('event-detail')

3.    return (
4.      <>
5.        <Suspense fallback\={<p\>Loading...</p\>}>
6.          <Await resolve\={event}>{(loadedEvent) \=> <EventItem event\={loadedEvent} />}</Await\>
7.        </Suspense\>

9.        <Suspense fallback\={<p\>Loading...</p\>}>
10.          <Await resolve\={events}>{(loadedEvents) \=> <EventsList events\={loadEvents} />}</Await\>
11.        </Suspense\>
12.    ...

using a **shared loader**:

1.  {
2.    path: '',
3.    element: <EventsPage />,
4.    loader: eventsLoader,
5.  }, // or index: true
6.  { path: 'new', element: <NewEventPage /> },
7.  {
8.    path: ':eventId',
9.    id: 'event-detail', // we can target that loader data in the children via useRouteLoaderData('event-detail')
10.    loader: eventDetailsLoader, // no layout el, just a shared loader across children
11.    children: \[
12.      { index: true, element: <EventDetailPage /> },
13.      { path: 'edit', element: <EditEventPage /> },
14.    \],
15.  },
16.  // { path: ':eventId', element: <EventDetailPage />, loader: eventDetailsLoader },
17.  // { path: ':eventId/edit', element: <EditEventPage /> },

20.  \---- later in the component:

22.  const data \= useRouteLoaderData('event-detail')

1.  export async function eventsLoader() {
2.    const response \= await fetch('http://localhost:8080/events')

4.    // also responses can be returned from the loader to shorten code
5.    // return response // in such case React Router will auto resolve it and return the response data  

7.    if (!response.ok) {
8.      // return { isError: true, message: 'Could not fetch data.' }

10.      // throw new Error('An error occurred') // in such case the closest errorElement would be automatically shown

12.      // throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 })

14.      return json({ message: 'Could not fetch events.' }, { status: 500 })
15.    } else {
16.      const resData \= await response.json()
17.      return resData.events
18.    }
19.  }

We could also return an error **response** in the loader and use the useRouteError hook to read it afterwards:

1.    // in the loader:
2.    throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 })

4.    ...

6.    // then in a component:
7.    const error \= useRouteError()
8.    //error.status
9.    let title \= 'An error occurred'
10.    let message \= 'Something went wrong'

12.    if (error.status \=== 500) {
13.      // message = JSON.parse(error.data).message

15.      // if json(...) is uses in the loader
16.      message \= error.data.message
17.    }
18.    if (error.status \=== 404) {
19.      title \= 'Not found!'
20.      message \= 'Could not find resource or page'
21.    }

1.  // loader example
2.  function EventsPage() {
3.    const navigation \= useNavigation()
4.    const data \= useLoaderData() // available to all same or lower level components
5.    const isLoading \= navigation.state \=== 'loading' // idle | loading | submitting; if used in a common menu page, the loading indication will be visible on any page we are currently on

7.    if (isLoading) return <p>Loading</p\>
8.    if (data.isError) return <p>{data.message}</p\>
9.    ..
10.  }

12.  export async function eventsLoader() {
13.    ...
14.  }

1.  function RootLayout() {
2.    return (
3.      <>
4.        <MainNavigation />
5.        <main>
6.          <Outlet />
7.        </main\>
8.      </>
9.    )
10.  }

12.  export default function EventsRootLayout() {
13.    return (
14.      <div>
15.        <EventsNavigation />
16.        <Outlet />
17.      </div\>
18.    )
19.  }

21.  function ProductDetailsPage() {
22.    const params \= useParams()

24.    console.log(params.productId)

26.    return <></>
27.  }

29.  function SomeComponent() {
30.    const navigate \= useNavigate()

32.    function handleNavigate() {
33.      navigate('/products')
34.    }

36.    return (
37.      <>
38.        <Link to\="/products"\>Products</Link\>
39.        <NavLink
40.          to\="/"
41.          className\=className\={({ isActive }) \=> (isActive ? 'active' : undefined)}
42.          end // the current link is considered active only if the url ends with the \`to\` value
43.        \>
44.          Products
45.        </NavLink\>
46.      </>
47.    )
48.  }

1.  import EventsPage, { eventsLoader } from './pages/EventsPage'

3.  function App() {
4.    const router \= createBrowserRouter(\[
5.      {
6.        path: '/',
7.        element: <RootLayout />,
8.        errorElement: <ErrorPage />, // auto shown on wrong urls and loader thrown errors; errors bubble up until they find an error page on the current level
9.        children: \[
10.          { index: true, element: <HomePage /> },
11.          {
12.            path: 'events',
13.            element: <EventsRootLayout />,
14.            children: \[
15.              {
16.                path: '', // or index: true
17.                element: <EventsPage />,
18.                loader: eventsLoader,
19.              { path: 'new', element: <NewEventPage /> },
20.              { path: ':eventId', element: <EventDetailPage /> },
21.              { path: ':eventId/edit', element: <EditEventPage /> },
22.            \],
23.          },
24.        \],
25.      },
26.    \])

28.    return <RouterProvider router\={router} />
29.  }

Redux Devtools works out of the box without additional setup if we use RTK

**Thunk** - a function that **delays an action** until later

It's an action creator function that does **NOT return the action** itself but instead **another function** which **eventually** returns the action

1.   useEffect(() \=> {
2.      const sendCartData \= async () \=> {
3.        dispatch(
4.          cartUiActions.showNotification({
5.            status: 'pending',
6.            title: 'Sending...',
7.            message: 'Sending cart data!',
8.          }),
9.        )

11.        const response \= await fetch(
12.          'https://udemy-react-21-redux-async-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
13.          {
14.            method: 'PUT',
15.            body: JSON.stringify(cart),
16.          },
17.        )

19.        if (!response.ok) {
20.          throw new Error('Error sending data.')
21.        }

23.        dispatch(
24.          cartUiActions.showNotification({
25.            status: 'success',
26.            title: 'Success.',
27.            message: 'Sending cart data successfully!',
28.          }),
29.        )
30.      }

32.      sendCartData().catch((error) \=>
33.        dispatch(
34.          cartUiActions.showNotification({
35.            status: 'error',
36.            title: 'Error.',
37.            message: 'Error sending cart data!',
38.          }),
39.        ),
40.      )
41.    }, \[cart, dispatch\])

{ method: 'PUT' } **adds** new data, **overriding** the existing data.

We'll listen to state changes globally in the App component and if such are detected, we send a request to the backend (Firebase).

Where to put logic (i.e. data transformations):

*   **synchronous**, side-effect free code - prefer **reducers**, avoid action creators or components.
    
*   **async** code or code with side-effects - prefer **action creators or components**, never reducers.
    

Redux **reducer** functions must be **pure**, **side-effect** free and **synchronous**.

input (old state + action) -> output (new state)

So **side effects & async tasks** can be executed inside the **components** (e.g. via useEffect()) or inside the **action creators**.

then in SomeComponent:

  

1.  import { useDispatch, useSelector } from 'react-redux'
2.  import { counterActions } from '../store'

4.  const Counter \= () \=> {
5.    const dispatch \= useDispatch()
6.    const counter \= useSelector((state) \=> state.counter) // the component gets subscribed to that part of the state
7.    const showCounter \= useSelector((state) \=> state.showCounter)

9.    const handleIncrement \= () \=> {
10.      // dispatch({ type: 'INCREMENT' })
11.      dispatch(counterActions.increment())
12.    }

14.    const handleIncrease \= () \=> {
15.      // dispatch({ type: 'INCREASE', amount: 5 })
16.      dispatch(counterActions.increase(5))
17.    }

19.    const handleDecrement \= () \=> {
20.      // dispatch({ type: 'DECREMENT' })
21.      dispatch(counterActions.decrement())
22.    }

24.    const toggleCounterHandler \= () \=> {
25.      // dispatch({ type: 'TOGGLE' })
26.      dispatch(counterActions.toggleCounter())
27.    }

1.  import { configureStore, createSlice } from '@reduxjs/toolkit'

3.  const initialState \= { counter: 0, showCounter: true }

5.  const counterSlice \= createSlice({
6.    name: 'counter',
7.    initialState,
8.    reducers: {
9.      increment(state) {
10.        state.counter++ // here with RTK we CAN MUTATE state because of the underlying Immer package
11.      },
12.      decrement(state) {
13.        state.counter\--
14.      },
15.      increase(state, action) {
16.        state.counter += action.amount
17.      },
18.      toggleCounter(state) {
19.        state.showCounter \= !state.showCounter
20.      },
21.    },
22.  })

24.  const store \= configureStore({
25.    reducer: counterSlice.reducer,
26.    // reducer: { counter: counterSlice.reducer }, ...
27.  })

29.  export const counterActions \= counterSlice.actions // { action: uniqueStr, payload: any}\[\]

31.  export default store

**Primitive** values are stored in the **STACK** - quick but limited memory.

**Reference** values are stored in the **HEAP** - a bit slower but bigger. Values there are not stacked, each has its own address. Then in the **STACK** we store the **reference** to the **address** where the object is. So the variable only holds the pointer. So by doing \`const obj1 = {...}; const obj2 = obj1;\` we only copy the pointer and we have 2 pointers referencing the same address.

  

https://academind.com/articles/reference-vs-primitive-values

1.  store.js:

3.  import { createStore } from 'redux'

5.  const initialState \= { counter: 0 }

7.  const counterReducer \= (state \= initialState, action) \=> {
8.    if (action.type \=== 'INCREMENT') {
9.      return { ...state, counter: state.counter + 1 } // NEVER mutate state!
10.    }

12.    if (action.type \=== 'DECREMENT') {
13.      return { ...state, counter: state.counter \- 1 }
14.    }

16.    return state
17.  }

19.  const store \= createStore(counterReducer)

21.  export default store

  

1.  index.js:

3.  import { Provider } from 'react-redux'
4.  import store from './store'

6.  root.render(
7.    <Provider store\={store}>
8.      <App />
9.    </Provider\>,
10.  )

1.  SomeComponent.jsx:

3.  import { useDispatch, useSelector } from 'react-redux'

5.  const Counter \= () \=> {
6.    const dispatch \= useDispatch()
7.    const counter \= useSelector((state) \=> state.counter) // the component gets subscribed to that part of the state

9.    const handleIncrement \= () \=> {
10.      dispatch({ type: 'INCREMENT' })
11.    }

13.    const handleDecrement \= () \=> {
14.      dispatch({ type: 'DECREMENT' })
15.    }

17.    ...
18.  }

Form Actions

Form Status

Modal dialog in a Portal

  

1.  export default function Modal({ open, className \= '', children, onClose }) {
2.    const dialogRef \= useRef()

4.    useEffect(() \=> {
5.      const modal \= dialogRef.current
6.      if (open) {
7.        modal.showModal() // when opened programmatically like than, certain features like the backdrop would work
8.      }

10.      return () \=> {
11.        modal.close() // close with the cleanup fn
12.      }
13.    }, \[open\])

15.    return createPortal(
16.      <dialog ref\={dialogRef} className\={\`modal ${className}\`} onClose\={onClose}>
17.        {children}
18.      </dialog\>,
19.      document.getElementById('modal'),
20.    )
21.  }

1.  updatedItems.splice(existingCartItemIdx, 1) // removes an element from the array, and optionally adds new elements on their place. returns the removed element.

`const CartContext = createContext({...})`

  

1.  // the goal of the reducer fn is to return an updated state
2.  function cartReducer(state, action) {
3.      const existingCartItemIdx \= state.items.findIndex((i) \=> i.id \=== action.item.id)
4.      const updatedItems \= \[...state.items\]

6.    if (action.type \=== 'ADD\_ITEM') {
7.      ...
8.      return { ...state, items: updatedItems }
9.    }

11.    if (action.type \=== 'REMOVE\_ITEM') {
12.      ...
13.      return { ...state, items: updatedItems }
14.    }

16.    return state
17.  }

19.  export default function CartContextProvider({children}) {
20.    return <CartContext\>{children}</CartContext\>
21.  }

1.  export const currencyFormatter \= new Intl.NumberFormat('bg-BG', {
2.    style: 'currency',
3.    currency: 'EUR',
4.  })

6.  \--------

8.  currencyFormatter.format(price)

response.**json()** - **converts** json formatted data to js objects and values. returns **Promise()**

**fetch**('http://...', { method: 'GET' } - **GET** is by **default** and could be omitted

Usually start a new project by first sketching it out, plan which components would be needed, building the core components and then gradually add new features.

Form Actions **summary**

We can define **Form Actions fns (FA)** and pass them to the form (action) / buttons (formAction) attributes. React will make sure these fns are invoked and will pass us **(prevState, formData)** params and will also auto reset the form. So we can use **const \[formState, formAction\] = useActionState(actionFn, initalFormStateValue)** so that our FAs can return values that we can use as formState to **update the UI** (show errors, re-populate controls values). We can do anything in the FAs, e.g. update the localStorage, send requests). They could be async. Then we can use const {pending} = **useFormStatus()** hook to update the UI whilst the form is being submitted, or **useOptimistic()** to perform optimistic updates (to set temp values that'll be auto removed once the FA is done.

**useOptimistic** hook - helps with **optimistic updating**

  

*   **optimisticVotes** - initial votes, later they get updated by the **setVotesOptimistically()** and can be shown in the UI only whilst the form that invoked this optimistic fn, is being submitted. And later this state will be replaced by the actual state
    
      
    
*   **setVotesOptimistically** - this fn can be called **in any Form Action** and it invokes the **second param fn** in the **useOptimistic** hook, and the params we pass will appear after the **prevVotes** (e.g. **mode**)
    
      
    

1.  export function Opinion({ id, votes }) {
2.    const \[optimisticVotes, setVotesOptimistically\] \= useOptimistic(
3.      votes,
4.      (prevVotes, mode) \=> mode \=== 'up' ? prevVotes + 1 : prevVotes \- 1
5.    )
6.    ...
7.  }

9.  async function upvoteAction() {
10.    setVotesOptimistically('up') //set optimistic value (optimisticVotes)
11.    await upvoteOpinion(id) //trigger request
12.  }

14.  <span>{optimisticVotes}</span> //instead of votes

Using **multiple** Form Action hooks - e.g. for each up/down vote buttons in a form

We can trigger **multiple** Form Actions in a form by assigning them to the form controls, e.g.:

<button **formAction={actionFn}**\>...</button>

import { **useFormStatus** } from 'react-dom' - this hook can be used in **conjunction** with Form Actions.

It can be used in a **nested** component in the form, not in the form action component:

const { pending, data, method, action } = **useFormStatus()**

The form action function can be placed **outside** of the component function if we are not using props or state in it

If we want to **keep entered values on form submit**, then we should return them in the formAction function: **return {errors, enteredValues: {email, name}}.** and later in the form set each one as a default value: **<input name="email" defaultValue={formState.enteredValues?.email}/>**

By default every time we submit a form with the new form action feature, React **clears** the form.

1.  async function signupAction(prevFormState, formData) {
2.      const email \= formData.get('email')
3.      ...
4.      if (...) return {errors: \[...\]}

6.      await submitDataFn({email, ...})

8.      return {errors: null}
9.  }

11.  const \[formState, formAction, pending\] \= useActionState(signupAction, { errors: null })

13.  <form action\={formAction}>... {pending && <p>Saving...</p>} ...</form\>

*   **{errors: null}** - initial formState
    
*   **formAction** - our signupAction wrapped and enhanced with extra features by React
    
*   **pending** - is the form currently being submitted or not, e.g. when having async operations
    

To get selected checkbox values from group of checkboxes with a common name: **const valuesArr = formData.getAll('checkboxesName')**

To check if a single checkbox is selected, e.g. Terms and conditions: **const terms = formData.get('terms')**

`<form action={signupAction}>...<input name="email" defaultValue={formState.enteredValues?.email}/>...</form>`

function signupAction(formData) {

  const enteredEmail = formData.get('email')

  ...

  if (...) return {errors: \[...\], enteredValues: {email, name}}

  return {errors: null}

}

**Form elements** should have the **name** prop set, in order for their value to be populated in the **formData** object

Exporting a custom hook for user input functionality. It could return: value, isDirty, isValid, onInputChange, onInputBlur, validationFn

Mixing custom & built-in validation logic.

Example of passwords-matching logic.

Using **browser built-in** props/attributes for validation:

*   required (adding it also makes the browser validate the type of field as well, e.g. email)
    
*   minLength
    
*   etc.
    

For **Keystroke validation** we should use **state**. FormData can't be used since it's updated on submit.

You are **discouraged** to use **refs** for **manipulating** the DOM

Two-way binding with combined state

Forms with two-way binding and state per input

**Buttons in forms** submit them by default, because they have **type="submit" by default**

Custom hook's state update causes the component in which it's used to be executed again.

**Custom hooks** - functions that start with "use" are treated by React as hooks, and thus the rules of hooks are enforced on them

When we are **fetching data** these three states usually go together: **result, isLoadaing, error**.

**Promise** - a js value, that will eventually resolve to another value.

`GET` - requests a representation of the specified resource. Requests using `GET` should only retrieve data and should not contain a request content.

`HEAD` - asks for a response identical to a `GET` request, but without a response body.

`POST` - submits an entity to the specified resource, often causing a change in state or side effects on the server. (add element)

`PUT` - replaces all current representations of the target resource with the request content. If the resource already exists, it will be replaced; if it does not exist, it will be created.

`PATCH` - applies partial modifications to a resource. It allows clients to update specific fields or properties of a resource without sending the entire representation. (edit element)

`DELETE` - deletes the specified resource.

`CONNECT` - establishes a tunnel to the server identified by the target resource.

`OPTIONS` - describes the communication options for the target resource.

`TRACE` - performs a message loop-back test along the path to the target resource.

**REST API** \- web server that exposes certain pre-defined routes to which HTTP requests can be sent

**useMemo()** - wraps normal functions that are wrapped in a component function, in order to prevent their execution - in case we have a complex calculation we want to avoid when possible. Shouldn't be over-used as well.

**useCallback()** - avoids the recreation of a function

**Clever component composition** is a powerful way to also reduce re-renders

nested setTimeouts

when we try to force reloading of elements by using the \`key\` trick, we must try to avoid ending up with **two elements** that are children of the same parent, **sharing the same key**. then we'll have a "key" error

Loading data to the state from a **synchronous** code like localStorage operations **doesn't need** to be in a useEffect hook as well

the more flexible **use()** hook (from React 19) - a React API that lets you read the value of a resource like a **Promise** or **context**. Unlike other React Hooks, `use` can be called within loops and conditional statements like `if`

NB: Variable in the component file outside of the component itself gets **shared** between the component instances that are based on that component function

dynamic styling based on passed props to the styled component

styled-components **forward all props** to the styled component

Static content like Header/Footer could be placed in the **index.html** public folder as well.

You should try to manage **as little state as possible** and **derive and compute** from it as much of the needed (computed) values as possible.

Different features, different repeatable code -> to **different components**

className={isSelected ? 'active' : **undefined** }

**Derived state / computed values** are values that shouldn't be managed as separate state since they can be derived from other state. The less state/hooks the better.

1.  setTodos((prevTodos) \=> prevTodos.concat(newTodo))

class can also be used as a type

react **custom hooks testing** \-  `react-hooks-testing-library`  extension

writing a basic test:

*   screen.getByText()
    
*   expect(...).not.toBeInTheDocument()
    

  

1.  test('renders Hello World as a text', () \=> {
2.    // Arrange
3.    render(<Greeting />)

5.    // Act
6.    // ... nothing

8.    // Assert
9.    //   screen.getByText(/hello world/i)
10.    //   screen.getByText('Hello world', { exact: false })
11.    const helloWorldEl \= screen.getByText('Hello World!')

13.    //   expect(helloWorldEl).not.toBeInTheDocument();
14.    expect(helloWorldEl).toBeInTheDocument()
15.  })

`describe()` - **grouping** tests in a suite

  

1.  describe('Greeting component', () \=> {
2.    test('renders Hello World as a text', () \=> {
3.      ...
4.    })

6.    test(...)

8.    ...
9.  })

Custom **Debouncing** - handleChange(), setTimeout(), useRef().

  

1.  const lastChange \= useRef()
2.  const \[searchTerm, setSearchTerm\] \= useState('')

4.  function handleChange(e) {
5.    if (lastChange.current) {
6.      clearTimeout(lastChange.current)
7.    }

9.    lastChange.current \= setTimeout(() \=> {
10.      lastChange.current \= null
11.      setSearchTerm(e.target.value)
12.    }, 500)
13.  }

using an `item key fn`

**Render Props**

children(item) - pass a callback function as children prop to a child component, to be called as a render function inside the child component (e.g. for rendering each child in a list). Child component possesses the logic, the parent - the way the child should render it.

  

in the child: `items.map(item => children(item))`

in the parent: `<Child items={PLACES}>{(item) => <Place item={item} />}</Child>`

`Accordion.Item = AccordionItem`  and later in App.jsx - `<Accordion.Item />`  and so on

Link component items to the main component and import only the main component afterwards and use the related components as properties.

Compound components (working in conjunction) example:

*   Accordion
    
*   AccordionItem
    
*   AccordionContext - local Accordion context
    
*   useAccordionContext() - to make sure the item is not used outside of the container component
    
*   AccordionItemContext() - to not to have to write the same id for title and content
    
*   useAccordionItemContext()
    

**useIsFetching()** - could be used to show a global fetching loading indicator

  

1.  export default function Header({ children }) {
2.    const fetching \= useIsFetching() // returns the number of queries currently fetching

4.    return (
5.      <>
6.        <div id\="main-header-loading"\>{fetching \> 0 && <progress />}</div\>
7.        ...
8.      </>
9.    )
10.  }

`queryClient.fetchQuery()` - trigger a query programatically (instead of using a hook)

  

1.  export default function EditEvent() {
2.    const { data, isPending, isError, error } \= useQuery({
3.      queryKey: \['events', params.id\],
4.      queryFn: ({ signal }) \=> fetchEvent({ id: params.id, signal }),
5.    })
6.    // ...
7.  }

9.  // will be triggered before the EditEvent component loads, TQ will cache it
10.  // and then the useQuery() hook will load the data from cache;
11.  // also the isPending check becomes unnecessary then
12.  export function loader({ params }) {
13.    return queryClient.fetchQuery({
14.      queryKey: \['events', params.id\],
15.      queryFn: ({ signal }) \=> fetchEvent({ id: params.id, signal }),
16.    })
17.  }

**Optimistic Update**

1.  ... \= useQuery({
2.    queryKey: \['events', id\],
3.    ...
4.  })

6.  const { mutate } \= useMutation({
7.    mutationFn: updateEvent,
8.    onMutate: async (data) \=> {
9.      const updatedEventData \= data.event
10.      await queryClient.cancelQueries({ queryKey: \['events', id\] }) // cancel outgoing useQuery() queries for the same key so we don't have clashing response & old data
11.      const prevEvent \= queryClient.getQueryData(\['events', id\]) // for rollback purposes
12.      queryClient.setQueryData(\['events', id\], updatedEventData) // OU the data before the response arrives

14.      return { prevEvent } // in order to be able to use it as context in onError so we rollback
15.    },
16.    onError: (error, data, context) \=> {
17.      queryClient.setQueryData(\['events', id\], context.prevEvent) // rollback the OU
18.    },
19.    onSettled: () \=> {
20.      // gets called everytime mutationFn finishes, no matter failed/succeeded
21.      queryClient.invalidateQueries(\['events', id\]) // to make sure FE and BE data for this key is synced
22.    }
23.  })

the same **queryKey** helping **using cached data** for the same event in EditEvent and EventDetails.

`refetchType: 'none'` - don't refetch other queries immediately on invalidation, but when they are required again

**\[NB\]** event **edit dynamic** key: `queryKey: [ 'events', id ]` . Could be also \['events', { id }\]

`queryClient.invalidateQueries({ queryKey: ['events'] })` - **invalidates** all queries, that include 'events' in their array. `exact: true` could be added for exact matches

queryFn params

useQuery() config

**Configure as a single-page app** - the server will always return the index.html file and the app js no matter what route we manually enter in the url field. In other words, client-side routing will be used instead of server-side routing.

**deploying** static website (non-fullstack) on Firebase servers

**Lazy loading** - load components when needed, instead of loading all initially.

set the token's **expiration time**

automatic logout on token expiration

**route protection** - add a loader with token check

  

1.  // utils.js
2.  export function checkAuthLoader() {
3.    const token \= getAuthToken()

5.    if (!token) {
6.      return redirect('/auth')
7.    }

9.    return null
10.  }

12.  // App.js
13.  ...

15.  {
16.    path: 'new',
17.    element: <NewEventPage />,
18.    action: manipulateEventAction,
19.    loader: checkAuthLoader, // route protection
20.  },

22.  {
23.    path: 'edit',
24.    element: <EditEventPage />,
25.    action: manipulateEventAction,
26.    loader: checkAuthLoader,
27.  },

29.  ...

  

"listening" for the token

adding the token to the outgoing request

`headers: { Authorization: 'Bearer ' + token }`

using **query params**

  

`<Link to="?mode=signup">...</Link>`

  

1.  const \[searchParams, setSearchParams\] \= useSearchParams()
2.  const isLogin \= searchParams.get('mode') \=== 'login' 

**defer** loading of loader data until after the component is loaded:

  

1.  function loadEvents() {...}

3.  export async function loader() {
4.    return { 
5.      event: await loadEvent(id), // this should be waited for before loading the page
6.      events: loadEvents() // will be loaded after loading the page
7.    }
8.  }

  

`const fetcher = useFetcher()` - used when we want to trigger an action/loader which **would not** initialize a route transition; in other words we trigger the action/loader without loading its component.

  

1.  const { data, state } \= fetcher

3.  ...

5.  <fetcher.Form ...>

**useActionData()** - gives us access to the data returned by our closest action

1.  const submit \= useSubmit()
2.  submit(null, { method: 'delete', action: '/a-different-path' } ) // or no path if we target the current route

`<Form method="post" action="another-path">` - trigger  **another path's** action

`return **redirect('/events')**` \- creates a response object that redirects the user to some page

router's **<Form method="post" />** \- submits form data to the router **action** instead of the backend

using **action()** to send data:

1.  { path: 'new', element: <NewEventPage />, action: newEventAction }

3.  \-----

5.  export async function action({ request, params }) {
6.    const data \= await request.formData()

8.    const eventData \= {
9.      title: data.get('title'),
10.      image: data.get('image'),
11.      date: data.get('date'),
12.      description: data.get('description'),
13.    }

15.    const response \= await fetch('http://localhost:8080', {
16.      method: 'POST',
17.      headers: {
18.        'Content-Type': 'application/json',
19.      },
20.      body: JSON.stringify(eventData),
21.    })

23.    if (!response.ok) {
24.      throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 })
25.    }

27.    return redirect('/events')
28.  }

adding **common** loader

using loader **params:**

1.  export async function loader({request, params}) {
2.    const response \= await fetch('http://localhost:8080/events/' + params.eventId)

4.    if (!response.ok) {
5.      throw new Response(JSON.stringify({ message: 'Could not fetch event' }), { status: 500 })
6.    } else {
7.      return response
8.    }
9.  };

  

Handling **loader errors**

Build a **Response** in the loader function

loader **loading** state

**loader()** \- load something (e.g. fetch data) **before** the component loads (instead of using useEffect() to load it **after** the first render)

NavLink **end** prop -  won't be marked as active if the current path has additional segments

**index** route - default route if the parent's route is active

`<Link to="..">Back</Link>`  - go back to the previously active path/route.

  

**relative** attribute:

*   `relative="route"` (default) - brings us back to the route's **parent** in the routes hierarchy
    
*   `relative="relative"` - goes back one level of the active **path** (removes the last segment)
    

If a path **starts with** `**/**` it's an **absolute path**, otherwise it's **relative**.

<Outlet/>

Routing: adding root **layout**

                                                                **Context API vs Redux**

**context api**:

\- you may end up with multiple **deeply nested providers** or one very large context component

\- **good for low frequency unlikely updates** (e.g. locale, theme, auth). not good if our data changes a lot, performance could suffer

\- **not good** for all Flux-like state propagation (**redux**)

\- for **small or medium sized applications** it could be fine

  

  

object param causing infinite hook loop => extracted outside of the component

  

1.  const requestConfig \= {}

3.  export default function Meals() {
4.    const { data: loadedMeals, error, isLoading } \= useHttp('http://localhost:3000/meals', requestConfig, \[\])

6.  ...
7.  }

**hide** dialog by useEffect's **cleanup** function:

  

1.    useEffect(() \=> {
2.      const modal \= dialogRef.current
3.      if (open) {
4.        modal.showModal() // when opened programmatically like than, certain features like the backdrop would work
5.      }

7.      return () \=> {
8.        modal.close()
9.      }
10.    }, \[open\])

**useContext()**;

**useReducer()** - makes it easier to manage more complex state and allows us to move the logic out of the ContextProvider component.

Good pattern - combine onBlur & startEdit for showing/hiding validation errors

**resetting** a form:

*   state reset
    
*   refs set to '' - _not recommended_
    
*   button type="reset"
    
*   form.reset()
    

**formData.getAll()** - to get **multiple items** with the same name, e.g. checkboxes. Those are **missing** in formData.entries().

  

Returns the checked ones as array:

`['friend', 'other']`

A common way to get all entered data:

  

1.  const entries \= Object.fromEntries(formData.entries())

3.  \=>

5.  {
6.    email: 'dada@dverve.bg',
7.    name: '...',
8.    ...
9.  }

**new FormData()** - for more complex forms

all fields must have a **name** prop

  

1.      // const postalCode = formData.get('postal-code')
2.      // const city = formData.get('city')

4.      const customerData \= Object.fromEntries(formData.entries())

**refs** - pros & cons (good when we don't have too much fields and we won't need to reset them, like read-only scenarios)

form onSubmit()

<button **type="button"** ... /> - with this attribute the button **doesn't submit** its parent form, because the default type is submit

**new Promise()** - return a custom **resolve** value;

pass a custom loading function with a Promise to the custom hook:

  

1.  async function fetchSortedPlaces() {
2.    const places \= await fetchAvailablePlaces()

4.    return new Promise((resolve, reject) \=> {
5.      navigator.geolocation.getCurrentPosition((position) \=> {
6.        const sortedPlaces \= sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)

8.        resolve(sortedPlaces)
9.      })
10.    })
11.  }

**Optimistic Update** - update the state immediately, before receiving "update successful response". if unsuccessful response is returned state would be reset.

fetch() using **PUT** method for sending data to the backend

response.ok

data fetching errors

fetch()

Error Boundaries

**optimizing** with Million.js

**state scheduling** (setState **schedules** an execution of the component with the new state value) & **batching** (multiple sequent setStates (for example in a function) get batched and executed together by React and in the end we get only 1 re-render of the component)

  

**setState(oldValue => newValue)** - guarantees we'll always get the correct old value if the new one should depend on it

Using **keys** for **resetting** components. In other words if the key changes, React re-creates the component. This way you can avoid using the useEffect() hook in some cases for example

with correct keys react **only** (re)renders the changed elements from the list, otherwise it does **all**

React **tracks each component state** by component **type** and **position** in the tree.

The state could **jump** to the wrong component if the keys are unsuitable. That's why index for key is not recommended when the components array size could change.

_In our case we have an index and a +1 or -1 value, which cannot form an unique combination, so we wrap the values like { value: -1, id: Math.random() \* 100 } and use the id as a key._

**Virtual DOM** (since real DOM operations are expensive):

1.  React first **creates a snapshot**, a virtual representation (in memory) of how the DOM should look like.
    
2.  then virtually **compares** it to the last snapshot it created, if there's one and quickly finds out **which parts have changed**
    
3.  then **applies only these changes** to the real DOM.
    

don't **overuse** memo, instead wrap the component that's as high up in the hierarchy as possible

**memo** - checks wrapped component's props for changes and the component doesn't get re-rendered if they are the same. prevents component function executions only if they are triggered by the parent component

a project with plenty of **timers and intervals**

**key** prop cannot be accessed as a normal prop inside of the component that possesses it

using **key attribute** to force component **re-render** when its parent does

**shuffle** an array:

`someArray.sort(() => Math.random() - 0.5)`

**optimizing state updates** by exporting part of the component to a new one

**<progress />** (with setInterval, setTimeout and useEffect) for visualizing **remaining time**

useCallback

useEffect setTimeout **cleanup** \- it's called right **before** the useEffect **runs again** or before the component is **dismounted**

**Another side effect** example: **localStorage**.getItem()/setItem(), JSON.stringify()/parse(). Currently doesn't need to be in UseEffect since it doesn't modify app's jsx. useEffect should be used **as little as possible** since it causes additional re-renders.

`useEffect` fires **after** the function component's execution has finished **and** when the dependencies change if there are any

`navigator.geolocation.getCurrentPosition(`

  `onLocationDeterminedCallback(position)`

`)`

function reducerFn(state, action) {

  if (action.type === 'ADD\_ITEM') { ... return { ...state, updatedValue } }

  ...

  

  return state

}

  

`const [state, dispatch] = useReducer(reducerFn, initialState)`

creating context provider component

Alternate context consuming method:

`<SomeCtx.Consumer>`

  `{(someCtx) => ...current_component_jsx...}`

`</SomeCtx.Consumer>`

**ctx default value** is set in case a component not wrapped in a ctx provider tries to access the context value (provides autocompletion, so probably not needed in ts)

context consuming

create context (api)

A component is changing an **uncontrolled** input to be **controlled** warning. Fixable in this case by setting it by default to '' instead of undefined in the state.

ref vs two-way binding

whitespace pre-wrap

date formatting

using **refs** instead of **two-way binding** (when we wanna just read the field values once we press the Save button)

**useImperativeHandle()** - write props and methods that should be accessible from an outside component

**ref** can't be forwarded as a standard prop, **forwardRef()** should be used instead in React < 19. **From React 19, they can**.

<dialog> + <form>

state vs refs

imperative vs declarative: use refs for reading and only for safe setting of data

**StrictMode**:

*   one of the most important things it does is that during development it **executes** every component function **twice** so that we could notice some problems early
    

Strict Mode enables the following development-only behaviors:

*   Your components will **re-render** an extra time to find bugs caused by impure rendering.
    
*   Your components will re-run **Effects** an extra time to find bugs caused by missing Effect cleanup.
    
*   Your components will re-run **refs callbacks** an extra time to find bugs caused by missing ref cleanup.
    
*   Your components will be checked for usage of **deprecated APIs**.
    

export styled components for reusing

prefix styled-components props with a **$**

**Scope classes** by renaming the css file to **SomeComponent.module.css**.

That's a signal for the Vite build tool to process the file differently.

And use that afterwards:

1.  import classes from './SomeComponent.module.css'

3.  <p className\={classes.paragraph}>...

currency formatter example

When NOT to lift state up

use **as little state** as possible, and try to **derive** as much info as possible from it

2D array deep copy:

`const copy = [...prevGameBoard.map(innerArray => [...innerArray])];`

update state **immutably**

When updating state based on a **previous state** then a function should be used instead of the new value e.g. `setValue(oldValue => !oldValue)` . `setValue` **schedules** the update instead of triggering it right away.

**jsx** can handle **arrays of renderable data**

importing an image from the assets folder

`<script src="..." type="module"></script>`

enables

`import ...;` 

syntax.

**Static data** could reside in the `index.html`.

adding static content in the index.html and in the public folder...

  

you can store **images** in the `public/` folder and then **directly reference** them from inside your `index.html` or `index.css` files.

  

#### Which Folder Should You Use?

You should use the `public/` folder for any images that should **not be handled by the build process** and that should be **generally available**. Good candidates are images used directly in the `index.html` file or favicons.

On the other hand, images that are used **inside of components** should typically be stored in the `src/` folder (e.g., in `src/assets/`).

passing components as props