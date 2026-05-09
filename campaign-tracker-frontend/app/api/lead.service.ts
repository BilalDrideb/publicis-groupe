import type { CampaignStat, CityStat, LeadPayload, ApiResponse } from '~/interfaces/lead.interface'

export const leadService = {
  async getCampaignStats(): Promise<CampaignStat[]> {
    const config = useRuntimeConfig()
    const response = await $fetch<ApiResponse<CampaignStat[]>>(`${config.public.apiBaseUrl}/leads/reports/leads-by-campaign`)
    return response.data || []
  },

  async getCityStats(): Promise<CityStat[]> {
    const config = useRuntimeConfig()
    const response = await $fetch<ApiResponse<CityStat[]>>(`${config.public.apiBaseUrl}/leads/reports/leads-by-city`)
    return response.data || []
  },

  async createLead(payload: LeadPayload): Promise<void> {
    const config = useRuntimeConfig()
    await $fetch(`${config.public.apiBaseUrl}/leads`, {
      method: 'POST',
      body: payload
    })
  }
}
