import { ChildAsRFC } from './Child'

const Parent = () => {
  return (
    <ChildAsRFC color="red" onClick={() => console.log('Clicked!')}>
      aa
    </ChildAsRFC>
  )
}

export default Parent
