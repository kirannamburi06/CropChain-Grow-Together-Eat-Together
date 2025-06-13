import apiService from '../services/api.js';

export class FarmsListingPage {
  constructor() {
    this.farms = [];
    this.searchTerm = '';
    this.showFilters = false;
    this.filters = {
      cropType: '',
      minPrice: '',
      maxPrice: '',
    };
    this.loading = false;
    this.error = null;
  }

  async render(container) {
    await this.loadFarms();

    const cropTypes = ['Organic Vegetables', 'Apples', 'Heritage Grains', 'Organic Berries', 'Free-Range Eggs', 'Other'];

    container.innerHTML = `
      <div class="bg-gray-50 min-h-screen">
        <!-- Page Header -->
        <div class="bg-green-600 text-white py-16">
          <div class="container mx-auto px-4">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">Support Local Farms</h1>
            <p class="text-xl max-w-3xl">
              Browse our selection of farms looking for support. Your investment helps them grow while securing your share of the harvest.
            </p>
          </div>
        </div>
        
        <!-- Search and Filters -->
        <div class="container mx-auto px-4 py-8">
          <div class="bg-white rounded-lg shadow-md p-4 mb-8">
            <form id="search-form" class="flex flex-wrap items-center gap-4">
              <div class="flex-1 min-w-[250px] relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i data-lucide="search" class="text-gray-400 w-4 h-4"></i>
                </div>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search farms, crops, or locations..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value="${this.searchTerm}"
                />
              </div>
              
              <button
                type="button"
                id="filters-btn"
                class="inline-flex items-center justify-center py-2 px-4 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors"
              >
                <i data-lucide="sliders-horizontal" class="mr-2 w-4 h-4"></i>
                Filters
              </button>
              
              <button type="submit" class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2">
                Search
              </button>
              
              ${(this.searchTerm || this.filters.cropType || this.filters.minPrice || this.filters.maxPrice) ? `
                <button
                  type="button"
                  id="clear-btn"
                  class="inline-flex items-center justify-center py-2 px-4 text-red-500 hover:text-red-600 rounded-md font-medium transition-colors"
                >
                  <i data-lucide="x" class="mr-1 w-4 h-4"></i>
                  Clear
                </button>
              ` : ''}
            </form>
            
            ${this.showFilters ? `
              <div class="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Crop Type
                  </label>
                  <select
                    id="crop-type-filter"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">All Types</option>
                    ${cropTypes.map(type => `
                      <option value="${type}" ${this.filters.cropType === type ? 'selected' : ''}>${type}</option>
                    `).join('')}
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Min Token Price (₹)
                  </label>
                  <input
                    id="min-price-filter"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value="${this.filters.minPrice}"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Max Token Price (₹)
                  </label>
                  <input
                    id="max-price-filter"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value="${this.filters.maxPrice}"
                  />
                </div>
              </div>
            ` : ''}
          </div>
          
          <!-- Results -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Available Farms</h2>
            <p class="text-gray-600">
              ${this.loading ? 'Loading farms...' : `Showing ${this.farms.length} farm${this.farms.length !== 1 ? 's' : ''} available for support`}
            </p>
          </div>
          
          <div id="farms-grid">
            ${this.renderFarmsGrid()}
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  async loadFarms() {
    this.loading = true;
    this.error = null;

    try {
      const params = {};
      
      if (this.searchTerm) params.search = this.searchTerm;
      if (this.filters.cropType) params.cropType = this.filters.cropType;
      if (this.filters.minPrice) params.minPrice = this.filters.minPrice;
      if (this.filters.maxPrice) params.maxPrice = this.filters.maxPrice;

      const response = await apiService.getFarms(params);
      this.farms = response.farms;
    } catch (error) {
      console.error('Failed to load farms:', error);
      this.error = error.message;
      this.farms = [];
    } finally {
      this.loading = false;
    }
  }

  renderFarmsGrid() {
    if (this.loading) {
      return `
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading farms...</p>
        </div>
      `;
    }

    if (this.error) {
      return `
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 class="text-xl font-semibold text-red-600 mb-2">Error Loading Farms</h3>
          <p class="text-gray-600 mb-4">${this.error}</p>
          <button onclick="window.location.reload()" class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2">
            Try Again
          </button>
        </div>
      `;
    }

    if (this.farms.length === 0) {
      return `
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">No farms found</h3>
          <p class="text-gray-600 mb-4">
            We couldn't find any farms matching your search criteria.
          </p>
          <button id="clear-filters-btn" class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2">
            Clear Filters
          </button>
        </div>
      `;
    }

    return `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${this.farms.map(farm => this.renderFarmCard(farm)).join('')}
      </div>
    `;
  }

  renderFarmCard(farm) {
    const percentFunded = (farm.currentFunding / farm.fundingGoal) * 100;
    const formattedDate = new Date(farm.harvestDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `
      <div class="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div class="relative h-48 overflow-hidden">
          <img 
            src="${farm.image}" 
            alt="${farm.name}" 
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div class="absolute top-0 left-0 m-3">
            <span class="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              ${farm.cropType}
            </span>
          </div>
        </div>
        
        <div class="p-6 flex-grow">
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-lg font-semibold text-gray-800 line-clamp-1">${farm.name}</h3>
          </div>
          
          <div class="flex items-center text-sm text-gray-500 mb-2">
            <i data-lucide="map-pin" class="mr-1 w-4 h-4"></i>
            <span>${farm.location}</span>
          </div>
          
          <div class="flex items-center text-sm text-gray-500 mb-3">
            <i data-lucide="calendar" class="mr-1 w-4 h-4"></i>
            <span>Harvest: ${formattedDate}</span>
          </div>
          
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">
            ${farm.description}
          </p>
          
          <div class="mt-auto">
            <div class="flex justify-between text-sm font-medium mb-1">
              <span>Progress</span>
              <span>₹${farm.currentFunding.toLocaleString()} of ₹${farm.fundingGoal.toLocaleString()}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                class="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style="width: ${Math.min(percentFunded, 100)}%"
              ></div>
            </div>
            
            <div class="mt-3 flex items-center space-x-2">
              <div class="text-xs text-gray-500">
                <span class="font-medium text-gray-800">₹${farm.tokenPrice}</span> per token
              </div>
              <div class="text-xs text-gray-500">
                <span class="font-medium text-gray-800">${farm.availableTokens}</span> tokens left
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-white border-t border-gray-100">
          <div class="w-full flex items-center justify-between">
            <div class="flex items-center">
              ${farm.farmer?.profileImage ? 
                `<img src="${farm.farmer.profileImage}" alt="${farm.farmer.name}" class="w-8 h-8 rounded-full object-cover mr-2">` :
                `<div class="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2">${farm.farmer?.name?.charAt(0) || 'F'}</div>`
              }
              <span class="text-sm font-medium">${farm.farmer?.name || 'Farmer'}</span>
            </div>
            
            <a href="/farms/${farm._id}/support" onclick="navigate('/farms/${farm._id}/support'); return false;"
               class="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors">
              Support Now
            </a>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const searchForm = document.getElementById('search-form');
    const filtersBtn = document.getElementById('filters-btn');
    const clearBtn = document.getElementById('clear-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    searchForm.addEventListener('submit', (e) => this.handleSearch(e));
    filtersBtn.addEventListener('click', () => this.toggleFilters());
    
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearFilters());
    }
    
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => this.clearFilters());
    }

    // Filter change listeners
    if (this.showFilters) {
      const cropTypeFilter = document.getElementById('crop-type-filter');
      const minPriceFilter = document.getElementById('min-price-filter');
      const maxPriceFilter = document.getElementById('max-price-filter');

      if (cropTypeFilter) {
        cropTypeFilter.addEventListener('change', (e) => {
          this.filters.cropType = e.target.value;
        });
      }

      if (minPriceFilter) {
        minPriceFilter.addEventListener('input', (e) => {
          this.filters.minPrice = e.target.value;
        });
      }

      if (maxPriceFilter) {
        maxPriceFilter.addEventListener('input', (e) => {
          this.filters.maxPrice = e.target.value;
        });
      }
    }
  }

  async handleSearch(e) {
    e.preventDefault();
    
    this.searchTerm = document.getElementById('search-input').value;
    await this.loadFarms();
    this.updateFarmsGrid();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
    this.render(document.getElementById('main-content'));
  }

  async clearFilters() {
    this.searchTerm = '';
    this.filters = {
      cropType: '',
      minPrice: '',
      maxPrice: '',
    };
    await this.loadFarms();
    this.render(document.getElementById('main-content'));
  }

  updateFarmsGrid() {
    const farmsGrid = document.getElementById('farms-grid');
    if (farmsGrid) {
      farmsGrid.innerHTML = this.renderFarmsGrid();
      
      // Re-initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }
}