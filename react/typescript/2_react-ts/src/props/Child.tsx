interface ChildProps {
  color: string
  onClick: () => void
}

// export const Child = (props: ChildProps) => {
export const Child = ({ color, onClick }: ChildProps) => {
  return (
    <div>
      Child content! {color}
      <button onClick={onClick}>Click me</button>
    </div>
  )
}

// this way TS recognizes it as a:
//  - React Function Component
//  - might have props like propTypes, contextTypes, displayName etc
//  - <...> - tells what props types will be received
//  - expects a 'children' prop by default
// React.FC ~ React.FunctionComponent
export const ChildAsRFC: React.FC<ChildProps> = ({ color, onClick }) => {
  return (
    <div>
      ChildFC: {color} <button onClick={onClick}>Click me</button>
    </div>
  )
}
