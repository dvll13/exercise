import { useFormStatus } from 'react-dom'

export default function Submit() {
  const { pending, data, method, action } = useFormStatus()
  console.log({ data, method, action })

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? 'Saving...' : 'Submit'}
      </button>
    </p>
  )
}
