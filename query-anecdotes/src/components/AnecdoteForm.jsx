import { useAnecdotes } from "../queries"
import useNotification from "../useNotification"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { notify } = useNotification()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    addAnecdote(content)
    event.target.reset()
    notify(`anecdote '${content}' created`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
