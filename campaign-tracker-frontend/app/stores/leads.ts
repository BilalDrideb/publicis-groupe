import { defineStore } from 'pinia'
import { leadService } from '~/api/lead.service'
import type { CampaignStat, CityStat, LeadPayload } from '~/interfaces/lead.interface'

export const useLeadsStore = defineStore('leads', {
  state: () => ({
    stats: [] as CampaignStat[],
    cityStats: [] as CityStat[],
    totalLeads: 0
  }),
  actions: {
    async fetchStats() {
      try {
        const [campaignData, cityData] = await Promise.all([
          leadService.getCampaignStats(),
          leadService.getCityStats()
        ])
        this.stats = campaignData
        this.cityStats = cityData

        // Calculate total leads from stats
        this.totalLeads = this.stats.reduce((acc, stat) => acc + stat.total_leads, 0)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    },
    async addLead(lead: LeadPayload) {
      try {
        await leadService.createLead(lead)
        await this.fetchStats()
      } catch (error) {
        console.error('Failed to create lead:', error)
        throw error
      }
    }
  }
})
