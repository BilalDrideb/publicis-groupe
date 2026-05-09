import type { ApiResponse, Location } from '~/interfaces/lead.interface'

export const locationService = {
  async getLocations(): Promise<Location[]> {
    const config = useRuntimeConfig()
    const response = await $fetch<ApiResponse<Location[]>>(`${config.public.apiBaseUrl}/locations`)
    return response.data || []
  }
}
