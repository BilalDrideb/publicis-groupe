import type { CampaignStat, CityStat, LeadPayload, ApiResponse, Campaign, Location } from '~/interfaces/lead.interface'

const API_BASE_URL = 'http://localhost:3001/api'

export const leadService = {
  async getCampaignStats(): Promise<CampaignStat[]> {
    const response = await $fetch<ApiResponse<CampaignStat[]>>(`${API_BASE_URL}/leads/reports/leads-by-campaign`)
    return response.data || []
  },

  async getCityStats(): Promise<CityStat[]> {
    const response = await $fetch<ApiResponse<CityStat[]>>(`${API_BASE_URL}/leads/reports/leads-by-city`)
    return response.data || []
  },

  async getCampaigns(): Promise<Campaign[]> {
    const response = await $fetch<ApiResponse<Campaign[]>>(`${API_BASE_URL}/campaigns`)
    return response.data || []
  },

  async getLocations(): Promise<Location[]> {
    const response = await $fetch<ApiResponse<Location[]>>(`${API_BASE_URL}/locations`)
    return response.data || []
  },

  async createLead(payload: LeadPayload): Promise<void> {
    await $fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      body: payload
    })
  }
}
