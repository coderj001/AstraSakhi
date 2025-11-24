const API_BASE_URL = 'http://localhost:3001/api';

const apiService = {
  getCompatibility: async (signFirst, signSecond) => {
    const response = await fetch(
      `${API_BASE_URL}/compatibility?signFirst=${signFirst}&signSecond=${signSecond}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  getDailyHoroscope: async () => {
    const response = await fetch(`${API_BASE_URL}/daily-horoscope`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  getCitySuggestions: async (key) => {
    const response = await fetch(`${API_BASE_URL}/cities/autocomplete?key=${key}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  matchMaking: async (data) => {
    const response = await fetch(`${API_BASE_URL}/matchmaking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  getKundliAshtakvarga: async (data) => {
    const response = await fetch(`${API_BASE_URL}/kundli/ashtakvarga`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  getKundliDivisional: async (data) => {
    const response = await fetch(`${API_BASE_URL}/kundli/divisional`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  getKundliDasha: async (data) => {
    const response = await fetch(`${API_BASE_URL}/kundli/dasha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  getKundliReport: async (data) => {
    const response = await fetch(`${API_BASE_URL}/kundli/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  getKundliGeneral: async (data) => {
    const response = await fetch(`${API_BASE_URL}/kundli/general`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  getKundliYoginiDasha: async (data) => {
    const response = await fetch(`${API_BASE_URL}/kundli/yogini-dasha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  findKundliCombination: async (data) => {
    const response = await fetch(`${API_BASE_URL}/kundli/find-combination`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};

export default apiService;
