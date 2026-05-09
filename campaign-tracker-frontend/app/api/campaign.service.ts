import type { ApiResponse, Campaign } from '~/interfaces/lead.interface'

export const campaignService = {
  async getCampaigns(): Promise<Campaign[]> {
    const config = useRuntimeConfig()
    const response = await $fetch<ApiResponse<Campaign[]>>(`${config.public.apiBaseUrl}/campaigns`)
    return response.data || []
  }
}
