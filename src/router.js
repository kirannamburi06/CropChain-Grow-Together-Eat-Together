import { HomePage } from './pages/HomePage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SignupPage } from './pages/SignupPage.js';
import { FarmsListingPage } from './pages/FarmsListingPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { ContactPage } from './pages/ContactPage.js';
import { AddFarmPage } from './pages/AddFarmPage.js';
import { TokenPurchasePage } from './pages/TokenPurchasePage.js';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';

export class Router {
  constructor(authManager) {
    this.authManager = authManager;
    this.navbar = new Navbar(authManager);
    this.footer = new Footer();
    this.currentPage = null;
  }

  init() {
    this.setupLayout();
    this.handleRoute();
  }

  setupLayout() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="flex flex-col min-h-screen">
        <div id="navbar"></div>
        <main class="flex-grow" id="main-content"></main>
        <div id="footer"></div>
      </div>
    `;

    this.navbar.render(document.getElementById('navbar'));
    this.footer.render(document.getElementById('footer'));
  }

  handleRoute() {
    const path = window.location.pathname;
    const mainContent = document.getElementById('main-content');

    // Destroy current page if exists
    if (this.currentPage && this.currentPage.destroy) {
      this.currentPage.destroy();
    }

    // Route to appropriate page
    switch (path) {
      case '/':
        this.currentPage = new HomePage();
        break;
      case '/login':
        if (this.authManager.isAuthenticated()) {
          this.navigate('/dashboard');
          return;
        }
        this.currentPage = new LoginPage(this.authManager);
        break;
      case '/signup':
        if (this.authManager.isAuthenticated()) {
          this.navigate('/dashboard');
          return;
        }
        this.currentPage = new SignupPage(this.authManager);
        break;
      case '/farms':
        this.currentPage = new FarmsListingPage();
        break;
      case '/contact':
        this.currentPage = new ContactPage();
        break;
      case '/dashboard':
        if (!this.authManager.isAuthenticated()) {
          this.navigate('/login');
          return;
        }
        this.currentPage = new DashboardPage(this.authManager);
        break;
      case '/profile':
        if (!this.authManager.isAuthenticated()) {
          this.navigate('/login');
          return;
        }
        this.currentPage = new ProfilePage(this.authManager);
        break;
      case '/farms/add':
        if (!this.authManager.isAuthenticated() || this.authManager.getCurrentUser()?.userType !== 'farmer') {
          this.navigate('/dashboard');
          return;
        }
        this.currentPage = new AddFarmPage(this.authManager);
        break;
      default:
        // Handle dynamic routes like /farms/:id/support
        if (path.match(/^\/farms\/\w+\/support$/)) {
          if (!this.authManager.isAuthenticated()) {
            this.navigate('/login');
            return;
          }
          const farmId = path.split('/')[2];
          this.currentPage = new TokenPurchasePage(farmId, this.authManager);
        } else {
          this.currentPage = new HomePage();
        }
        break;
    }

    this.currentPage.render(mainContent);
    this.navbar.updateAuthState();
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
}

// Global navigation function
window.navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};