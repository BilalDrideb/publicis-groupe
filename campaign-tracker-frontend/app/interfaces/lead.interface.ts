export interface CampaignStat {
  campaign: string
  total_leads: number
}

export interface CityStat {
  city: string
  total_leads: number
}

export interface Campaign {
  id: number
  name: string
}

export interface Location {
  id: number
  city_name: string
}

export interface LeadPayload {
  full_name: string
  email: string
  birth_date: string
  campaign_id: number
  location_id: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
