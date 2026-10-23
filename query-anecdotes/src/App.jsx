import { useAnecdotes } from './queries'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const { anecdotes, isPending, isError, addAnecdote, addVote } = useAnecdotes()

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to issues with the server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
