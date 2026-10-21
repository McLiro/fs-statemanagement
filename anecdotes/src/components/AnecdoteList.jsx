import { useAnecdotes, useAnecdotesControls } from "../store"
import { useNotificationControls } from "../notificationStore"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  const { addVote, removeAnecdote } = useAnecdotesControls()
  const { notify } = useNotificationControls()

  const vote = anecdote => {
    addVote(anecdote.id)
    notify(`you voted '${anecdote.content}'`)
  }

  const remove = anecdote => {
    removeAnecdote(anecdote.id)
    notify(`you deleted '${anecdote.content}'`)
  }

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => remove(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
