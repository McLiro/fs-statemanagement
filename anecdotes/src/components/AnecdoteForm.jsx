import { useAnecdotesControls } from '../store'
import { useNotificationControls } from '../notificationStore'

const AnecdoteForm = () => {
  const { newAnecdote } = useAnecdotesControls()
  const { notify } = useNotificationControls()

  const addAnectode = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    await newAnecdote(content)
    e.target.reset()
    notify(`You created '${content}'`)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnectode}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
