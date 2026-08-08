import { useAccordionContext } from './Accordion'
import { useAccordionItemContext } from './AccordionItem'

export default function AccordionTitle({ className, children }) {
  const { toggleItem } = useAccordionContext()
  const id = useAccordionItemContext()

  function handleClick() {
    toggleItem(id)
  }

  return (
    <h3 onClick={handleClick} className={className}>
      {children}
    </h3>
  )
}
