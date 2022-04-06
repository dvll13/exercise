const EventComponent: React.FC = () => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
  }

  return (
    <div>
      <input type="text" onChange={onChange} />
      <input type="text" onChange={(e) => console.log(e)} />
    </div>
  )
}

export default EventComponent
