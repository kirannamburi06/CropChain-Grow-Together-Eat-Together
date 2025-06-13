export class ProfilePage {
  constructor(authManager) {
    this.authManager = authManager;
    this.isLoading = false;
  }

  render(container) {
    const user = this.authManager.getCurrentUser();
    
    if (!user) {
      navigate('/login');
      return;
    }

    container.innerHTML = `
      <div class="max-w-3xl mx-auto py-10 px-4">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
            <h1 class="text-2xl font-bold text-gray-800">Complete Your Profile</h1>
            <p class="text-gray-600">
              Tell us more about yourself so we can personalize your experience.
            </p>
          </div>
          
          <div class="px-6 py-4">
            <form id="profile-form" class="space-y-6">
              <div class="flex flex-col items-center mb-6">
                <div class="relative mb-4">
                  ${user.profileImage ? 
                    `<img src="${user.profileImage}" alt="${user.name}" class="w-24 h-24 rounded-full object-cover border-4 border-green-100">` :
                    `<div class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                      <i data-lucide="user" class="text-green-600 w-10 h-10"></i>
                    </div>`
                  }
                  <button
                    type="button"
                    class="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-700 transition-colors"
                  >
                    <i data-lucide="camera" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="w-full max-w-sm">
                  <input
                    id="profileImage"
                    type="text"
                    placeholder="Image URL (optional)"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value="${user.profileImage || ''}"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value="${user.name || ''}"
                    required
                  />
                  <p id="name-error" class="mt-1 text-sm text-red-600 hidden"></p>
                </div>
                
                <div>
                  <label for="userType" class="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
                  <select
                    id="userType"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="farmer" ${user.userType === 'farmer' ? 'selected' : ''}>Farmer</option>
                    <option value="supporter" ${user.userType === 'supporter' ? 'selected' : ''}>Supporter</option>
                  </select>
                  <p id="userType-error" class="mt-1 text-sm text-red-600 hidden"></p>
                </div>
                
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="123-456-7890"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value="${user.phone || ''}"
                  />
                  <p id="phone-error" class="mt-1 text-sm text-red-600 hidden"></p>
                </div>
                
                <div>
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="123 Main St, Anytown, USA"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value="${user.address || ''}"
                  />
                </div>
              </div>
              
              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  id="skip-btn"
                  class="inline-flex items-center justify-center py-2 px-4 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors"
                >
                  Skip for now
                </button>
                <button
                  type="submit"
                  id="save-btn"
                  class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2"
                >
                  <span id="save-text">Save Profile</span>
                  <svg id="save-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
    const form = document.getElementById('profile-form');
    const skipBtn = document.getElementById('skip-btn');

    form.addEventListener('submit', (e) => this.handleSubmit(e));
    skipBtn.addEventListener('click', () => navigate('/dashboard'));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const formData = {
      name: document.getElementById('name').value,
      userType: document.getElementById('userType').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      profileImage: document.getElementById('profileImage').value,
    };

    this.clearErrors();

    if (!this.validateForm(formData)) return;

    this.setLoading(true);

    try {
      this.authManager.updateUser(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      this.setLoading(false);
    }
  }

  validateForm(formData) {
    let isValid = true;

    if (!formData.name.trim()) {
      this.showError('name', 'Name is required');
      isValid = false;
    }

    if (!formData.userType) {
      this.showError('userType', 'Please select your role');
      isValid = false;
    }

    if (formData.phone && !/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
      this.showError('phone', 'Phone should be in format: 123-456-7890');
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
    ['name', 'userType', 'phone'].forEach(field => {
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
    const btn = document.getElementById('save-btn');
    const text = document.getElementById('save-text');
    const spinner = document.getElementById('save-spinner');

    if (btn && text && spinner) {
      btn.disabled = loading;
      text.textContent = loading ? 'Loading...' : 'Save Profile';
      spinner.classList.toggle('hidden', !loading);
    }
  }
}