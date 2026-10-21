import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    notify: message => {
      set({ notification: message })
      setTimeout(() => set({ notification: '' }), 5000)
    }
  }
}))

export const useNotification = () => useNotificationStore(state => state.notification)
export const useNotificationControls = () => useNotificationStore(state => state.actions)
