const API_BASE_URL = 'http://localhost:3001/api'

const apiService = {
  getCompatibility: async (signFirst, signSecond) => {
    const response = await fetch(
      `${API_BASE_URL}/compatibility?signFirst=${signFirst}&signSecond=${signSecond}`,
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },
  getDailyHoroscope: async () => {
    const response = await fetch(`${API_BASE_URL}/daily-horoscope`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },
  getCitySuggestions: async (key) => {
    const response = await fetch(
      `${API_BASE_URL}/cities/autocomplete?key=${key}`,
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },
}

export default apiService
