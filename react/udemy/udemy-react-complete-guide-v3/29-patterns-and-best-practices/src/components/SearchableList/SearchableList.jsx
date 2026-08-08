import { useRef, useState } from 'react'

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef()
  const [searchTerm, setSearchTerm] = useState('')

  const searchResults = items.filter(
    (item) => searchTerm !== '' && JSON.stringify(item).toLowerCase().includes(searchTerm),
  )

  function handleChange(e) {
    if (lastChange.current) {
      clearTimeout(lastChange.current)
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null
      setSearchTerm(e.target.value)
    }, 500)
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search..." onChange={handleChange} />
      <ul>
        {searchResults.map((item, i) => (
          <li key={itemKeyFn()}>{children(item)}</li>
        ))}
      </ul>
    </div>
  )
}
