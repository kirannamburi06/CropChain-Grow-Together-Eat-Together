import apiService from '../services/api.js';

export class TokenPurchasePage {
  constructor(farmId, authManager) {
    this.farmId = farmId;
    this.authManager = authManager;
    this.farm = null;
    this.tokenQuantity = 1;
    this.isProcessing = false;
    this.paymentSuccess = false;
    this.paymentMethod = 'card';
    this.loading = true;
    this.error = null;
  }

  async render(container) {
    await this.loadFarm();

    if (this.loading) {
      container.innerHTML = `
        <div class="bg-gray-50 min-h-screen py-10">
          <div class="container mx-auto px-4">
            <div class="flex justify-center items-center h-64">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (this.error || !this.farm) {
      container.innerHTML = `
        <div class="bg-gray-50 min-h-screen py-10">
          <div class="container mx-auto px-4">
            <div class="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 class="text-2xl font-bold text-red-600 mb-4">Error</h2>
              <p class="text-gray-600 mb-6">${this.error || 'Farm not found'}</p>
              <a href="/farms" onclick="navigate('/farms'); return false;" 
                 class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2">
                Back to Farms
              </a>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const totalPrice = this.farm.tokenPrice * this.tokenQuantity;

    container.innerHTML = `
      <div class="bg-gray-50 min-h-screen py-10">
        <div class="container mx-auto px-4">
          <a href="/farms" onclick="navigate('/farms'); return false;" 
             class="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
            <i data-lucide="arrow-left" class="mr-2 w-4 h-4"></i>
            Back to Farms
          </a>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Farm Information -->
            <div class="md:col-span-1">
              <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="h-48 overflow-hidden">
                  <img 
                    src="${this.farm.image}" 
                    alt="${this.farm.name}" 
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="p-6">
                  <h1 class="text-xl font-bold text-gray-800 mb-2">${this.farm.name}</h1>
                  
                  <div class="flex items-center text-sm text-gray-500 mb-2">
                    <i data-lucide="map-pin" class="mr-1 w-4 h-4"></i>
                    <span>${this.farm.location}</span>
                  </div>
                  
                  <div class="flex items-center text-sm text-gray-500 mb-3">
                    <i data-lucide="calendar" class="mr-1 w-4 h-4"></i>
                    <span>
                      Harvest: ${new Date(this.farm.harvestDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  
                  <p class="text-gray-600 text-sm mb-4">
                    ${this.farm.description}
                  </p>
                  
                  <div class="border-t border-gray-100 pt-4 mt-4">
                    <div class="flex justify-between text-sm font-medium mb-1">
                      <span>Progress</span>
                      <span>$${this.farm.currentFunding.toLocaleString()} of $${this.farm.fundingGoal.toLocaleString()}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        class="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style="width: ${Math.min((this.farm.currentFunding / this.farm.fundingGoal) * 100, 100)}%"
                      ></div>
                    </div>
                    
                    <div class="mt-3 flex items-center space-x-2">
                      <div class="text-xs text-gray-500">
                        <span class="font-medium text-gray-800">$${this.farm.tokenPrice}</span> per token
                      </div>
                      <div class="text-xs text-gray-500">
                        <span class="font-medium text-gray-800">${this.farm.availableTokens}</span> tokens left
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Token Purchase Form -->
            <div class="md:col-span-2">
              ${this.paymentSuccess ? this.renderSuccessMessage() : this.renderPurchaseForm()}
            </div>
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

  async loadFarm() {
    this.loading = true;
    this.error = null;

    try {
      const response = await apiService.getFarm(this.farmId);
      this.farm = response.farm;
    } catch (error) {
      console.error('Failed to load farm:', error);
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  renderSuccessMessage() {
    return `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-8 text-center">
          <div class="flex justify-center mb-6">
            <i data-lucide="check-circle" class="text-green-600 w-16 h-16"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Thank You for Your Support!
          </h2>
          <p class="text-gray-600 mb-8">
            Your purchase of ${this.tokenQuantity} token${this.tokenQuantity !== 1 ? 's' : ''} for ${this.farm.name} was successful. You'll be notified when the harvest is ready.
          </p>
          <div class="flex justify-center space-x-4">
            <a href="/dashboard" onclick="navigate('/dashboard'); return false;"
               class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2">
              Go to Dashboard
            </a>
            <a href="/farms" onclick="navigate('/farms'); return false;"
               class="inline-flex items-center justify-center py-2 px-4 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors">
              Support More Farms
            </a>
          </div>
        </div>
      </div>
    `;
  }

  renderPurchaseForm() {
    const totalPrice = this.farm.tokenPrice * this.tokenQuantity;

    return `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Support ${this.farm.name}
          </h2>
          
          <form id="purchase-form" class="space-y-6">
            <div class="bg-gray-50 p-4 rounded-md mb-6">
              <h3 class="font-semibold text-gray-800 mb-2">
                Token Information
              </h3>
              <p class="text-gray-600 text-sm mb-4">
                Each token represents a share of the harvest or profit from this farm. You'll receive your share after the harvest date.
              </p>
              
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="bg-white p-3 rounded border border-gray-200">
                  <p class="text-sm text-gray-500">Token Price</p>
                  <p class="font-semibold">$${this.farm.tokenPrice}</p>
                </div>
                <div class="bg-white p-3 rounded border border-gray-200">
                  <p class="text-sm text-gray-500">Available Tokens</p>
                  <p class="font-semibold">${this.farm.availableTokens}</p>
                </div>
              </div>
              
              <div>
                <label for="tokenQuantity" class="block text-sm font-medium text-gray-700 mb-1">Number of Tokens</label>
                <input
                  id="tokenQuantity"
                  type="number"
                  min="1"
                  max="${this.farm.availableTokens}"
                  value="${this.tokenQuantity}"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div class="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
                <div class="flex justify-between">
                  <span class="font-medium">Total Cost:</span>
                  <span id="total-cost" class="font-bold text-green-600">$${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="font-semibold text-gray-800 mb-4">
                Payment Method
              </h3>
              
              <div class="space-y-3">
                <label class="flex items-center p-4 border rounded-md cursor-pointer bg-white">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span class="ml-3">
                    <span class="block text-sm font-medium text-gray-700">Credit Card</span>
                    <span class="block text-sm text-gray-500">Pay with your credit or debit card</span>
                  </span>
                  <i data-lucide="credit-card" class="ml-auto text-gray-400"></i>
                </label>
                
                <div class="p-4 border rounded-md bg-gray-50 space-y-4">
                  <div>
                    <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="expDate" class="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                      <input
                        id="expDate"
                        type="text"
                        placeholder="MM/YY"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label for="cvc" class="block text-sm font-medium text-gray-700 mb-1">Security Code</label>
                      <input
                        id="cvc"
                        type="text"
                        placeholder="CVC"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200">
              <button
                type="submit"
                id="purchase-btn"
                class="w-full inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2"
              >
                <span id="purchase-text">Complete Purchase ($${totalPrice})</span>
                <svg id="purchase-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
              <p class="text-center text-sm text-gray-500 mt-2">
                By completing this purchase, you agree to our Terms of Service.
              </p>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    if (!this.paymentSuccess) {
      const form = document.getElementById('purchase-form');
      const quantityInput = document.getElementById('tokenQuantity');

      if (form) {
        form.addEventListener('submit', (e) => this.handleSubmit(e));
      }

      if (quantityInput) {
        quantityInput.addEventListener('input', (e) => this.handleQuantityChange(e));
      }
    }
  }

  handleQuantityChange(e) {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= this.farm.availableTokens) {
      this.tokenQuantity = value;
      const totalCost = document.getElementById('total-cost');
      const purchaseText = document.getElementById('purchase-text');
      const totalPrice = this.farm.tokenPrice * this.tokenQuantity;
      
      if (totalCost) {
        totalCost.textContent = `$${totalPrice.toLocaleString()}`;
      }
      
      if (purchaseText) {
        purchaseText.textContent = `Complete Purchase ($${totalPrice})`;
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isProcessing) return;

    this.setLoading(true);

    try {
      await apiService.purchaseTokens(this.farmId, this.tokenQuantity);
      this.paymentSuccess = true;
      this.render(document.getElementById('main-content'));
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.message || 'Payment failed. Please try again.');
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(loading) {
    this.isProcessing = loading;
    const btn = document.getElementById('purchase-btn');
    const text = document.getElementById('purchase-text');
    const spinner = document.getElementById('purchase-spinner');

    if (btn && text && spinner) {
      btn.disabled = loading;
      text.textContent = loading ? 'Processing...' : `Complete Purchase ($${this.farm.tokenPrice * this.tokenQuantity})`;
      spinner.classList.toggle('hidden', !loading);
    }
  }
}