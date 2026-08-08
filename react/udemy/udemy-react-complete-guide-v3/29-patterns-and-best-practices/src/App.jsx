import Accordion from './components/Accordion/Accordion'
import AccordionItem from './components/Accordion/AccordionItem'
import SearchableList from './components/SearchableList/SearchableList'
import Place from './components/SearchableList/Place'

import savannaImg from './assets/african-savanna.jpg'
import amazonImg from './assets/amazon-river.jpg'
import caribbeanImg from './assets/caribbean-beach.jpg'
import desertImg from './assets/desert-dunes.jpg'
import forestImg from './assets/forest-waterfall.jpg'

function App() {
  return (
    <main>
      {/* COMPOuND COMPONENTS - components used in junction together */}
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <Accordion.Item id="i1" className="accordion-item">
            <Accordion.Title className="accordion-item-title">We got 20 years of experience</Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>You can't go wrong with us</p>
                <p>dyra byra sto chadyra dyra byra sto chadyra dyra byra sto chadyra </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="i2" className="accordion-item">
            <Accordion.Title className="accordion-item-title">We got 20 years of experience</Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>You can't go wrong with us</p>
                <p>dyra byra sto chadyra dyra byra sto chadyra dyra byra sto chadyra </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="i3" className="accordion-item">
            <Accordion.Title className="accordion-item-title">We got 20 years of experience</Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>You can't go wrong with us</p>
                <p>dyra byra sto chadyra dyra byra sto chadyra dyra byra sto chadyra </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>

      {/* RENDER PROPS - Pass a render function to a child as a prop, to help it render an element by a specified by the
      parent way. */}
      <section>
        <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
          {(item) => <Place item={item} />}
        </SearchableList>
        <SearchableList items={['item 1', 'item 2']} itemKeyFn={(item) => item}>
          {(item) => item}
        </SearchableList>
      </section>
    </main>
  )
}

const PLACES = [
  {
    id: 'african-savanna',
    image: savannaImg,
    title: 'African Savanna',
    description: 'Experience the beauty of nature.',
  },
  {
    id: 'amazon-river',
    image: amazonImg,
    title: 'Amazon River',
    description: 'Get to know the largest river in the world.',
  },
  {
    id: 'caribbean-beach',
    image: caribbeanImg,
    title: 'Caribbean Beach',
    description: 'Enjoy the sun and the beach.',
  },
  {
    id: 'desert-dunes',
    image: desertImg,
    title: 'Desert Dunes',
    description: 'Discover the desert life.',
  },
  {
    id: 'forest-waterfall',
    image: forestImg,
    title: 'Forest Waterfall',
    description: 'Listen to the sound of the water.',
  },
]

export default App
