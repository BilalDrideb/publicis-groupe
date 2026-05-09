import type { ApiResponse, Location } from '~/interfaces/lead.interface'

const API_BASE_URL = 'http://localhost:3001/api'

export const locationService = {
  async getLocations(): Promise<Location[]> {
    const response = await $fetch<ApiResponse<Location[]>>(`${API_BASE_URL}/locations`)
    return response.data || []
  }
}
