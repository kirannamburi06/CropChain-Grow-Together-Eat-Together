import { FarmerDashboard } from '../components/dashboard/FarmerDashboard.js';
import { SupporterDashboard } from '../components/dashboard/SupporterDashboard.js';

export class DashboardPage {
  constructor(authManager) {
    this.authManager = authManager;
  }

  render(container) {
    const user = this.authManager.getCurrentUser();
    
    if (!user) {
      navigate('/login');
      return;
    }

    container.innerHTML = `
      <div class="bg-gray-50 min-h-screen py-10">
        <div class="container mx-auto px-4">
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div class="relative">
                ${user.profileImage ? 
                  `<img src="${user.profileImage}" alt="${user.name}" class="w-24 h-24 rounded-full object-cover border-4 border-green-100">` :
                  `<div class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                    <i data-lucide="user" class="text-green-600 w-10 h-10"></i>
                  </div>`
                }
              </div>
              
              <div class="flex-1">
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 class="text-2xl font-bold text-gray-800">${user.name}</h1>
                    <p class="text-gray-600">
                      ${user.userType === 'farmer' ? 'Farmer' : 'Supporter'}
                    </p>
                    ${user.address ? `<p class="text-gray-500 text-sm mt-1">${user.address}</p>` : ''}
                  </div>
                  
                  <div class="flex space-x-3">
                    <a href="/profile" onclick="navigate('/profile'); return false;" 
                       class="inline-flex items-center justify-center px-3 py-1.5 text-sm border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors">
                      <i data-lucide="edit" class="mr-2 w-4 h-4"></i>
                      Edit Profile
                    </a>
                    <button class="inline-flex items-center justify-center px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors">
                      <i data-lucide="settings" class="mr-2 w-4 h-4"></i>
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div id="dashboard-content"></div>
        </div>
      </div>
    `;

    // Render appropriate dashboard
    const dashboardContent = document.getElementById('dashboard-content');
    if (user.userType === 'farmer') {
      const farmerDashboard = new FarmerDashboard(this.authManager);
      farmerDashboard.render(dashboardContent);
    } else {
      const supporterDashboard = new SupporterDashboard(this.authManager);
      supporterDashboard.render(dashboardContent);
    }

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}