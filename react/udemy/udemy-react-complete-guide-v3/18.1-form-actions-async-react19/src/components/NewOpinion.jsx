import { useActionState, use } from 'react'
import { OpinionsContext } from '../store/opinions-context'
import Submit from './Submit'

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext)
  const [formState, formAction /*, pending */] = useActionState(newOpinionAction, { errors: null })

  async function newOpinionAction(prevFormState, formData) {
    const userName = formData.get('userName')
    const title = formData.get('title')
    const body = formData.get('body')

    const errors = []

    if (!userName.trim()) {
      errors.push('Please enter your name.')
    }
    if (title.trim().length < 5) {
      errors.push('Please enter a title of at least 5 chars long.')
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Please enter message body between 10 and 300 chars.')
    }

    if (errors.length) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      }
    }

    await addOpinion({ userName, title, body })

    return { errors: null }
  }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.name} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        <Submit />
        {/* <p className="actions">
          <button type="submit" disabled={pending}>
            Submit
          </button>
        </p> */}
      </form>
    </div>
  )
}
