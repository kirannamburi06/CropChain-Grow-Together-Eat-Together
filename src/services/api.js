const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('cropchain_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('cropchain_token', token);
    } else {
      localStorage.removeItem('cropchain_token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(data.token);
    return data;
  }

  async register(email, password, name, userType = 'supporter') {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, userType }),
    });
    
    this.setToken(data.token);
    return data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async refreshToken() {
    const data = await this.request('/auth/refresh', {
      method: 'POST',
    });
    
    this.setToken(data.token);
    return data;
  }

  // Farm endpoints
  async getFarms(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/farms?${queryString}` : '/farms';
    return this.request(endpoint);
  }

  async getFarm(id) {
    return this.request(`/farms/${id}`);
  }

  async createFarm(farmData) {
    return this.request('/farms', {
      method: 'POST',
      body: JSON.stringify(farmData),
    });
  }

  async updateFarm(id, farmData) {
    return this.request(`/farms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(farmData),
    });
  }

  async deleteFarm(id) {
    return this.request(`/farms/${id}`, {
      method: 'DELETE',
    });
  }

  async purchaseTokens(farmId, quantity) {
    return this.request(`/farms/${farmId}/purchase`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  }

  // User endpoints
  async updateProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getUserTokens() {
    return this.request('/users/tokens');
  }

  async getUserFarms() {
    return this.request('/users/farms');
  }

  async getDashboardData() {
    return this.request('/users/dashboard');
  }

  // Utility methods
  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}

export default new ApiService();