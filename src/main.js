import './index.css';
import { Router } from './router.js';
import { AuthManager } from './auth/AuthManager.js';

// Initialize the application
class App {
  constructor() {
    this.authManager = new AuthManager();
    this.router = new Router(this.authManager);
    this.init();
  }

  init() {
    // Initialize the router
    this.router.init();
    
    // Handle browser navigation
    window.addEventListener('popstate', () => {
      this.router.handleRoute();
    });
  }
}

// Start the application
new App();