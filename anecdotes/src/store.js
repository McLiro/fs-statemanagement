import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addVote: id => set(
      state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? {...a, votes: a.votes + 1} : a)
      })
    ),
    newAnecdote: async anecdote => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      set(state => ({ anecdotes: [...state.anecdotes, newAnecdote] }))
    },
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
