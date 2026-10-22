import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdotesControls } from '../store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.resetAllMocks()
})

describe('useAnecdotesControls', () => {
  it('initializes state with anecdotes from the backend', async () => {
    const mockAnecdotes = [
      { content: 'mock anecdote', id: 1, votes: 0 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdotesControls())

    await act(async () => {
      await result.current.initialize()
    })

    expect(anecdoteService.getAll).toHaveBeenCalledTimes(1)
    expect(useAnecdoteStore.getState().anecdotes).toEqual(mockAnecdotes)
  })
})

describe('useAnecdotes', () => {
  const anecdotes = [
    { content: 'mock anecdote1', id: 1, votes: 1 },
    { content: 'mock anecdote2', id: 2, votes: 5 },
    { content: 'mock anecdote3', id: 3, votes: 0 }
  ]

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes })
  })

  it('returns anecdotes sorted by descending votes', () => {
    const { result } = renderHook(() => useAnecdotes())

    expect(result.current.map(a => a.votes)).toEqual([5, 1, 0])
  })
})