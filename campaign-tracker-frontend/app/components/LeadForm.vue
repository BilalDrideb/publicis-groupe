<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
    <h2 class="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
      <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
      Register New Lead
    </h2>
    
    <form @submit.prevent="submitForm" class="space-y-5">
      <!-- Full Name -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
        <input v-model="form.full_name" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="e.g. Jane Doe">
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
          <input v-model="form.email" type="email" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="jane@example.com">
        </div>
        
        <!-- Birth date -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Birth date</label>
          <input v-model="form.birth_date" type="date" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700">
        </div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <!-- Select Campaign -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Campaign</label>
          <select v-model="form.campaign_id" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-gray-700">
            <option value="" disabled>Select a campaign...</option>
            <option v-for="campaign in campaigns" :key="campaign.id" :value="campaign.id">{{ campaign.name }}</option>
          </select>
        </div>
        
        <!-- Location -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
          <select v-model="form.location_id" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-gray-700">
            <option value="" disabled>Select a city...</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.city_name }}</option>
          </select>
        </div>
      </div>
      
      <!-- Checkbox for T&C -->
      <div class="flex items-start pt-2">
        <div class="flex items-center h-5 mt-0.5">
          <input v-model="form.agreeTerms" id="terms" type="checkbox" required class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer transition-colors">
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="font-medium text-gray-600 cursor-pointer">
            I agree to the <a href="#" class="text-indigo-600 hover:text-indigo-500 underline decoration-indigo-200 underline-offset-2">Terms & Conditions</a>.
          </label>
        </div>
      </div>
      
      <!-- Submit Button -->
      <div class="pt-4">
        <button type="submit" :disabled="loading" class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform active:scale-[0.99] flex justify-center items-center gap-2">
          <span v-if="loading">Submitting...</span>
          <span v-else>Submit Registration</span>
          <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLeadsStore } from '~/stores/leads'
import { useCampaignsStore } from '~/stores/campaigns'
import { useLocationsStore } from '~/stores/locations'
import * as yup from 'yup'
import { toast } from 'vue-sonner'
import { leadSchema } from '~/validations/lead.schema'

const store = useLeadsStore()
const campaignsStore = useCampaignsStore()
const locationsStore = useLocationsStore()

const campaigns = computed(() => campaignsStore.campaigns)
const cities = computed(() => locationsStore.locations)

const initialFormState = {
  full_name: '',
  email: '',
  birth_date: '',
  campaign_id: '',
  location_id: '',
  agreeTerms: false
}

const form = ref({ ...initialFormState })
const loading = ref(false)

onMounted(async () => {
  try {
    await Promise.all([
      campaignsStore.fetchCampaigns(),
      locationsStore.fetchLocations()
    ])
  } catch (error) {
    toast.error('Failed to load campaigns and locations')
  }
})

const validateForm = async () => {
  try {
    await leadSchema.validate({
      full_name: form.value.full_name,
      email: form.value.email,
      birth_date: form.value.birth_date,
      campaign_id: Number(form.value.campaign_id),
      location_id: Number(form.value.location_id),
      agreeTerms: form.value.agreeTerms
    }, { abortEarly: false })
    return true
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      error.inner.forEach(err => {
        toast.error(err.message)
      })
    }
    return false
  }
}

const submitForm = async () => {
  loading.value = true
  
  const isValid = await validateForm()
  if (!isValid) {
    loading.value = false
    return
  }

  try {
    await store.addLead({
      full_name: form.value.full_name,
      email: form.value.email,
      birth_date: form.value.birth_date,
      campaign_id: Number(form.value.campaign_id),
      location_id: Number(form.value.location_id)
    })
    
    toast.success('Lead registered successfully!')
    form.value = { ...initialFormState }
  } catch (error) {
    // Backend or network error
    const errResponse = error as any
    const backendMessage = errResponse?.data?.message || 'Failed to register lead. Please try again.'
    toast.error(backendMessage)
  } finally {
    loading.value = false
  }
}
</script>
