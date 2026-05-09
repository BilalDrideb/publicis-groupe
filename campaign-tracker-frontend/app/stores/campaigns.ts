import { defineStore } from 'pinia'
import { campaignService } from '~/api/campaign.service'
import type { Campaign } from '~/interfaces/lead.interface'

export const useCampaignsStore = defineStore('campaigns', {
  state: () => ({
    campaigns: [] as Campaign[]
  }),
  actions: {
    async fetchCampaigns() {
      try {
        this.campaigns = await campaignService.getCampaigns()
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
        throw error
      }
    }
  }
})
