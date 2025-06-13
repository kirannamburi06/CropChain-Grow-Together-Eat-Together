import apiService from '../services/api.js';

export class AddFarmPage {
  constructor(authManager) {
    this.authManager = authManager;
    this.isLoading = false;
  }

  render(container) {
    const user = this.authManager.getCurrentUser();
    
    if (!user || user.userType !== 'farmer') {
      navigate('/dashboard');
      return;
    }

    container.innerHTML = `
      <div class="max-w-3xl mx-auto py-10 px-4">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
            <h1 class="text-2xl font-bold text-gray-800">Add New Farm</h1>
            <p class="text-gray-600">
              Share details about your farm and the crops you want to grow with community support.
            </p>
          </div>
          
          <div class="px-6 py-4">
            <form id="farm-form" class="space-y-6">
              <div class="border-b border-gray-200 pb-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Green Valley Organics"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    <p id="name-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                  
                  <div>
                    <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      id="location"
                      type="text"
                      placeholder="Napa Valley, CA"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    <p id="location-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                  
                  <div class="md:col-span-2">
                    <label for="cropType" class="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                    <select
                      id="cropType"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select crop type</option>
                      <option value="Organic Vegetables">Organic Vegetables</option>
                      <option value="Apples">Apples</option>
                      <option value="Heritage Grains">Heritage Grains</option>
                      <option value="Organic Berries">Organic Berries</option>
                      <option value="Free-Range Eggs">Free-Range Eggs</option>
                      <option value="Other">Other</option>
                    </select>
                    <p id="cropType-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                  
                  <div class="md:col-span-2">
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      id="description"
                      rows="4"
                      placeholder="Tell supporters about your farm and your growing practices..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    ></textarea>
                    <p id="description-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                  
                  <div class="md:col-span-2">
                    <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Farm Image</label>
                    <div class="mt-1 flex items-center">
                      <div class="relative">
                        <div id="image-preview" class="w-24 h-24 rounded-md bg-gray-100 flex items-center justify-center">
                          <i data-lucide="camera" class="text-gray-400 w-6 h-6"></i>
                        </div>
                      </div>
                      <input
                        id="image"
                        type="text"
                        placeholder="Enter image URL"
                        class="ml-4 flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <p id="image-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                </div>
              </div>
              
              <div class="border-b border-gray-200 pb-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Funding Details</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label for="fundingGoal" class="block text-sm font-medium text-gray-700 mb-1">Funding Goal (₹)</label>
                    <input
                      id="fundingGoal"
                      type="number"
                      min="1"
                      placeholder="10000"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    <p id="fundingGoal-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                  
                  <div>
                    <label for="tokenPrice" class="block text-sm font-medium text-gray-700 mb-1">Token Price (₹)</label>
                    <input
                      id="tokenPrice"
                      type="number"
                      min="1"
                      placeholder="50"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    <p id="tokenPrice-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                  
                  <div>
                    <label for="totalTokens" class="block text-sm font-medium text-gray-700 mb-1">Total Tokens</label>
                    <input
                      id="totalTokens"
                      type="number"
                      min="1"
                      placeholder="200"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    <p id="totalTokens-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Schedule</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="plantingDate" class="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i data-lucide="calendar" class="text-gray-400 w-4 h-4"></i>
                      </div>
                      <input
                        id="plantingDate"
                        type="date"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <p id="plantingDate-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                  
                  <div>
                    <label for="harvestDate" class="block text-sm font-medium text-gray-700 mb-1">Estimated Harvest Date</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i data-lucide="calendar" class="text-gray-400 w-4 h-4"></i>
                      </div>
                      <input
                        id="harvestDate"
                        type="date"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <p id="harvestDate-error" class="mt-1 text-sm text-red-600 hidden"></p>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  id="cancel-btn"
                  class="inline-flex items-center justify-center py-2 px-4 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-btn"
                  class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2"
                >
                  <span id="submit-text">Add Farm</span>
                  <svg id="submit-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </div>
            </form>
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

  setupEventListeners() {
    const form = document.getElementById('farm-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const imageInput = document.getElementById('image');

    form.addEventListener('submit', (e) => this.handleSubmit(e));
    cancelBtn.addEventListener('click', () => navigate('/dashboard'));
    
    // Image preview
    imageInput.addEventListener('input', (e) => {
      const imageUrl = e.target.value;
      const preview = document.getElementById('image-preview');
      
      if (imageUrl) {
        preview.innerHTML = `<img src="${imageUrl}" alt="Farm preview" class="w-24 h-24 object-cover rounded-md">`;
      } else {
        preview.innerHTML = '<i data-lucide="camera" class="text-gray-400 w-6 h-6"></i>';
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const formData = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      cropType: document.getElementById('cropType').value,
      location: document.getElementById('location').value,
      image: document.getElementById('image').value,
      fundingGoal: document.getElementById('fundingGoal').value,
      tokenPrice: document.getElementById('tokenPrice').value,
      totalTokens: document.getElementById('totalTokens').value,
      harvestDate: document.getElementById('harvestDate').value,
      plantingDate: document.getElementById('plantingDate').value,
    };

    this.clearErrors();

    if (!this.validateForm(formData)) return;

    this.setLoading(true);

    try {
      await apiService.createFarm(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding farm:', error);
      this.showError('name', error.message || 'Failed to create farm');
    } finally {
      this.setLoading(false);
    }
  }

  validateForm(formData) {
    let isValid = true;
    const fields = [
      'name', 'description', 'cropType', 'location', 'image',
      'fundingGoal', 'tokenPrice', 'totalTokens', 'harvestDate', 'plantingDate'
    ];

    fields.forEach(field => {
      if (!formData[field] || !formData[field].toString().trim()) {
        this.showError(field, `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        isValid = false;
      }
    });

    // Validate numeric fields
    if (formData.fundingGoal && (isNaN(parseFloat(formData.fundingGoal)) || parseFloat(formData.fundingGoal) <= 0)) {
      this.showError('fundingGoal', 'Please enter a valid funding goal');
      isValid = false;
    }

    if (formData.tokenPrice && (isNaN(parseFloat(formData.tokenPrice)) || parseFloat(formData.tokenPrice) <= 0)) {
      this.showError('tokenPrice', 'Please enter a valid token price');
      isValid = false;
    }

    if (formData.totalTokens && (isNaN(parseInt(formData.totalTokens)) || parseInt(formData.totalTokens) <= 0)) {
      this.showError('totalTokens', 'Please enter a valid number of tokens');
      isValid = false;
    }

    // Validate dates
    const plantingDate = new Date(formData.plantingDate);
    const harvestDate = new Date(formData.harvestDate);
    
    if (harvestDate <= plantingDate) {
      this.showError('harvestDate', 'Harvest date must be after planting date');
      isValid = false;
    }

    return isValid;
  }

  showError(field, message) {
    const errorElement = document.getElementById(`${field}-error`);
    const inputElement = document.getElementById(field);
    
    if (errorElement && inputElement) {
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
      inputElement.classList.add('border-red-500');
    }
  }

  clearErrors() {
    const fields = [
      'name', 'description', 'cropType', 'location', 'image',
      'fundingGoal', 'tokenPrice', 'totalTokens', 'harvestDate', 'plantingDate'
    ];

    fields.forEach(field => {
      const errorElement = document.getElementById(`${field}-error`);
      const inputElement = document.getElementById(field);
      
      if (errorElement && inputElement) {
        errorElement.classList.add('hidden');
        inputElement.classList.remove('border-red-500');
      }
    });
  }

  setLoading(loading) {
    this.isLoading = loading;
    const btn = document.getElementById('submit-btn');
    const text = document.getElementById('submit-text');
    const spinner = document.getElementById('submit-spinner');

    if (btn && text && spinner) {
      btn.disabled = loading;
      text.textContent = loading ? 'Creating...' : 'Add Farm';
      spinner.classList.toggle('hidden', !loading);
    }
  }
}