import { useAnecdotes, useAnecdotesControls } from "../store"
import { useNotificationControls } from "../notificationStore"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  const { addVote } = useAnecdotesControls()
  const { notify } = useNotificationControls()

  const vote = anecdote => {
    addVote(anecdote.id)
    notify(`You voted '${anecdote.content}'`)
  }

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
