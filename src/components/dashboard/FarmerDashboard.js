import { mockFarms } from '../../data/mockData.js';

export class FarmerDashboard {
  constructor(authManager) {
    this.authManager = authManager;
    this.farms = mockFarms.filter(farm => farm.farmerId === '1'); // Mock farmer ID
  }

  render(container) {
    container.innerHTML = `
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">My Farms</h2>
          <a href="/farms/add" onclick="navigate('/farms/add'); return false;"
             class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2">
            <i data-lucide="plus" class="mr-2 w-4 h-4"></i>
            Add New Farm
          </a>
        </div>
        
        ${this.farms.length === 0 ? this.renderEmptyState() : this.renderFarmsList()}
      </div>
    `;

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderEmptyState() {
    return `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="py-12 px-6 text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-2">No farms yet</h3>
          <p class="text-gray-600 mb-6">Start by adding your first farm to raise support.</p>
          <a href="/farms/add" onclick="navigate('/farms/add'); return false;"
             class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2">
            <i data-lucide="plus" class="mr-2 w-4 h-4"></i>
            Add Farm
          </a>
        </div>
      </div>
    `;
  }

  renderFarmsList() {
    return `
      <div class="space-y-6">
        ${this.farms.map(farm => this.renderFarmCard(farm)).join('')}
      </div>
    `;
  }

  renderFarmCard(farm) {
    const percentFunded = (farm.currentFunding / farm.fundingGoal) * 100;

    return `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/4 h-48 md:h-auto">
            <img 
              src="${farm.image}" 
              alt="${farm.name}" 
              class="w-full h-full object-cover"
            />
          </div>
          <div class="md:w-3/4 p-6">
            <div class="flex flex-wrap justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-800">${farm.name}</h3>
                <p class="text-gray-600 text-sm">${farm.cropType} • ${farm.location}</p>
              </div>
              <div class="flex space-x-2">
                <a href="/farms/${farm.id}/edit" onclick="navigate('/farms/${farm.id}/edit'); return false;"
                   class="inline-flex items-center justify-center px-3 py-1.5 text-sm border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors">
                  <i data-lucide="edit" class="mr-1 w-4 h-4"></i>
                  Edit
                </a>
                <button 
                  onclick="deleteFarm('${farm.id}')"
                  class="inline-flex items-center justify-center px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors">
                  <i data-lucide="trash-2" class="mr-1 w-4 h-4 text-red-500"></i>
                  Delete
                </button>
                <a href="/farms/${farm.id}" target="_blank"
                   class="inline-flex items-center justify-center px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors">
                  <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium mb-1">
                <span>Funding Progress</span>
                <span>₹${farm.currentFunding.toLocaleString()} of ₹${farm.fundingGoal.toLocaleString()}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  class="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style="width: ${Math.min(percentFunded, 100)}%"
                ></div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div class="bg-gray-50 p-3 rounded">
                <p class="text-gray-500 mb-1">Token Price</p>
                <p class="font-semibold">₹${farm.tokenPrice}</p>
              </div>
              <div class="bg-gray-50 p-3 rounded">
                <p class="text-gray-500 mb-1">Available Tokens</p>
                <p class="font-semibold">${farm.availableTokens} / ${farm.totalTokens}</p>
              </div>
              <div class="bg-gray-50 p-3 rounded">
                <p class="text-gray-500 mb-1">Harvest Date</p>
                <p class="font-semibold">
                  ${new Date(farm.harvestDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Global function for deleting farms
window.deleteFarm = (farmId) => {
  if (confirm('Are you sure you want to delete this farm?')) {
    // In a real app, this would make an API call
    console.log('Deleting farm:', farmId);
    // Refresh the dashboard
    window.location.reload();
  }
};