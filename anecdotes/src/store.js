import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addVote: id => set(
      state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? {...a, votes: a.votes + 1} : a)
      })
    ),
    newAnecdote: anecdote => set(
      state => ({
        anecdotes: [...state.anecdotes, asObject(anecdote)]
      })
    ),
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set (() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}
export const useAnecdotesControls = () => useAnecdoteStore((state) => state.actions)
