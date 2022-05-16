import './cell-list.css'
import { Fragment } from 'react'
import { useTypedSelector } from './../hooks/use-typed-selector'
import AddCell from './add-cell'
import CellListItem from './cell-list-item'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id: string) => data[id]))
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div className="cell-list">
      <AddCell previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
