<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-0 overflow-hidden flex flex-col h-full min-h-[400px] transition-all hover:shadow-md">
    <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white gap-4">
      <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
        <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        Performance Report
      </h2>
      
      <div class="flex items-center gap-4">
        <!-- Tabs -->
        <div class="bg-gray-100 p-1 rounded-lg flex text-sm font-medium">
          <button 
            @click="activeTab = 'campaigns'" 
            :class="[activeTab === 'campaigns' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700', 'px-3 py-1.5 rounded-md transition-all']"
          >
            By Campaign
          </button>
          <button 
            @click="activeTab = 'cities'" 
            :class="[activeTab === 'cities' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700', 'px-3 py-1.5 rounded-md transition-all']"
          >
            By City
          </button>
        </div>

        <span v-if="store.totalLeads > 0" class="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1.5 rounded-full border border-indigo-100">
          {{ store.totalLeads }} Total Leads
        </span>
      </div>
    </div>
    
    <div class="flex-1 overflow-x-auto bg-gray-50/30">
      <!-- Campaigns Table -->
      <table v-if="activeTab === 'campaigns' && store.stats.length > 0" class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Campaign Name</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Leads</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="stat in store.stats" :key="stat.campaign" class="hover:bg-indigo-50/30 transition-colors group">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 group-hover:text-indigo-900">{{ stat.campaign }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                {{ stat.total_leads }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Cities Table -->
      <table v-else-if="activeTab === 'cities' && store.cityStats.length > 0" class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">City Name</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Leads</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="stat in store.cityStats" :key="stat.city" class="hover:bg-indigo-50/30 transition-colors group">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 group-hover:text-indigo-900 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              {{ stat.city }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                {{ stat.total_leads }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Empty State -->
      <div v-else class="h-full flex flex-col items-center justify-center text-gray-400 py-16 px-4 text-center bg-white">
        <div class="bg-gray-50 p-4 rounded-full mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </div>
        <h3 class="text-base font-semibold text-gray-700 mb-1">No data available</h3>
        <p class="text-sm text-gray-500 max-w-xs">Fill out the form to register your first lead and generate the performance report.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLeadsStore } from '~/stores/leads'

const store = useLeadsStore()
const activeTab = ref<'campaigns' | 'cities'>('cities')

onMounted(() => {
  store.fetchStats()
})
</script>
