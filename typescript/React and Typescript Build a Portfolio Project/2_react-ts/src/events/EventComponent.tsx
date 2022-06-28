const EventComponent: React.FC = () => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
  }

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('dragging', event)
  }

  return (
    <div>
      <input type="text" onChange={onChange} />
      <input type="text" onChange={(e) => console.log(e)} />

      <div draggable onDragStart={onDragStart}>
        Drag me!
      </div>
    </div>
  )
}

export default EventComponent
