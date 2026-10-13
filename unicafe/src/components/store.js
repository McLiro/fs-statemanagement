import { create } from 'zustand'

const useStatsStore = create(set => ({
  stats: {
    good: 0,
    neutral: 0,
    bad: 0,
  },
  actions: {
    addGood: () =>
      set(state => ({ stats: { ...state.stats, good: state.stats.good + 1 } })),
    addNeutral: () =>
      set(state => ({ stats: { ...state.stats, neutral: state.stats.neutral + 1 } })),
    addBad: () =>
      set(state => ({ stats: { ...state.stats, bad: state.stats.bad + 1 } })),
  },
}))

export const useStats = () => useStatsStore(state => state.stats)
export const useStatsControls = () => useStatsStore(state => state.actions)