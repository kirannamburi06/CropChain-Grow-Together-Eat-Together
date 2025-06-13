import apiService from '../services/api.js';

export class AuthManager {
  constructor() {
    this.user = null;
    this.loadUserFromToken();
  }

  async loadUserFromToken() {
    if (apiService.isAuthenticated()) {
      try {
        const response = await apiService.getCurrentUser();
        this.user = response.user;
      } catch (error) {
        console.error('Failed to load user:', error);
        apiService.logout();
      }
    }
  }

  async login(email, password) {
    try {
      const response = await apiService.login(email, password);
      this.user = response.user;
      return response.user;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  async signup(email, password, name, userType = 'supporter') {
    try {
      const response = await apiService.register(email, password, name, userType);
      this.user = response.user;
      return response.user;
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  }

  async updateUser(userData) {
    try {
      const response = await apiService.updateProfile(userData);
      this.user = response.user;
      return response.user;
    } catch (error) {
      throw new Error(error.message || 'Profile update failed');
    }
  }

  logout() {
    this.user = null;
    apiService.logout();
  }

  isAuthenticated() {
    return !!this.user && apiService.isAuthenticated();
  }

  getCurrentUser() {
    return this.user;
  }

  async refreshToken() {
    try {
      await apiService.refreshToken();
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
    }
  }
}