import { defineStore } from 'pinia'

export const trackStore = defineStore('currentTrack', {
  state: () => {
    return { currentTrack: null }
  },
})