import type { ApiResponse, Campaign } from '~/interfaces/lead.interface'

const API_BASE_URL = 'http://localhost:3001/api'

export const campaignService = {
  async getCampaigns(): Promise<Campaign[]> {
    const response = await $fetch<ApiResponse<Campaign[]>>(`${API_BASE_URL}/campaigns`)
    return response.data || []
  }
}
