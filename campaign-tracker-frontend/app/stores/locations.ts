import { defineStore } from 'pinia'
import { locationService } from '~/api/location.service'
import type { Location } from '~/interfaces/lead.interface'

export const useLocationsStore = defineStore('locations', {
  state: () => ({
    locations: [] as Location[]
  }),
  actions: {
    async fetchLocations() {
      try {
        this.locations = await locationService.getLocations()
      } catch (error) {
        console.error('Failed to fetch locations:', error)
        throw error
      }
    }
  }
})
