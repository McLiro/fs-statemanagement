import { useAnecdotesControls } from "../store"

const AnecdoteForm = () => {
  const { newAnecdote } = useAnecdotesControls()

  const addAnectode = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    newAnecdote(content)
    e.target.reset()
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
