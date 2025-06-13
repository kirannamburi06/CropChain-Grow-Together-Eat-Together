export class SignupPage {
  constructor(authManager) {
    this.authManager = authManager;
    this.isLoading = false;
  }

  render(container) {
    container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div class="text-center">
            <div class="flex justify-center">
              <i data-lucide="leaf" class="text-green-600 w-9 h-9"></i>
            </div>
            <h2 class="mt-6 text-3xl font-bold text-gray-800">Create an Account</h2>
            <p class="mt-2 text-gray-600">
              Join CropChain and be part of sustainable agriculture
            </p>
          </div>
          
          <div class="mt-8 space-y-6">
            <div class="grid grid-cols-2 gap-3">
              <button
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled
              >
                <i data-lucide="facebook" class="h-5 w-5 text-blue-600 mr-2"></i>
                <span>Facebook</span>
              </button>
              <button
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled
              >
                <i data-lucide="globe" class="h-5 w-5 text-red-500 mr-2"></i>
                <span>Google</span>
              </button>
            </div>
            
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Or sign up with email</span>
              </div>
            </div>
            
            <form id="signup-form" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i data-lucide="user" class="h-5 w-5 text-gray-400"></i>
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <p id="name-error" class="mt-1 text-sm text-red-600 hidden"></p>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i data-lucide="mail" class="h-5 w-5 text-gray-400"></i>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <p id="email-error" class="mt-1 text-sm text-red-600 hidden"></p>
              </div>
              
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i data-lucide="lock" class="h-5 w-5 text-gray-400"></i>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <p id="password-error" class="mt-1 text-sm text-red-600 hidden"></p>
              </div>
              
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i data-lucide="lock" class="h-5 w-5 text-gray-400"></i>
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <p id="confirmPassword-error" class="mt-1 text-sm text-red-600 hidden"></p>
              </div>
              
              <div class="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  required
                />
                <label for="terms" class="ml-2 block text-sm text-gray-700">
                  I agree to the
                  <a href="#" class="font-medium text-green-600 hover:text-green-500">
                    Terms of Service
                  </a>
                  and
                  <a href="#" class="font-medium text-green-600 hover:text-green-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
              
              <button
                type="submit"
                id="signup-btn"
                class="w-full inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2"
              >
                <span id="signup-text">Create Account</span>
                <svg id="signup-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </form>
            
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Already have an account?
                <a href="/login" onclick="navigate('/login'); return false;" class="font-medium text-green-600 hover:text-green-500">
                  Sign in
                </a>
              </p>
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

  setupEventListeners() {
    const form = document.getElementById('signup-form');
    form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    this.clearErrors();

    if (!this.validateForm(name, email, password, confirmPassword)) return;

    this.setLoading(true);

    try {
      await this.authManager.signup(email, password, name);
      navigate('/profile');
    } catch (error) {
      if (error.message === 'User already exists') {
        this.showError('email', 'Email already in use');
      } else {
        this.showError('email', 'Failed to sign up');
        this.showError('password', 'Failed to sign up');
      }
    } finally {
      this.setLoading(false);
    }
  }

  validateForm(name, email, password, confirmPassword) {
    let isValid = true;

    if (!name || name.trim() === '') {
      this.showError('name', 'Full name is required');
      isValid = false;
    }

    if (!email) {
      this.showError('email', 'Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      this.showError('email', 'Email is invalid');
      isValid = false;
    }

    if (!password) {
      this.showError('password', 'Password is required');
      isValid = false;
    } else if (password.length < 6) {
      this.showError('password', 'Password must be at least 6 characters');
      isValid = false;
    }

    if (password !== confirmPassword) {
      this.showError('confirmPassword', 'Passwords do not match');
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
    ['name', 'email', 'password', 'confirmPassword'].forEach(field => {
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
    const btn = document.getElementById('signup-btn');
    const text = document.getElementById('signup-text');
    const spinner = document.getElementById('signup-spinner');

    if (btn && text && spinner) {
      btn.disabled = loading;
      text.textContent = loading ? 'Loading...' : 'Create Account';
      spinner.classList.toggle('hidden', !loading);
    }
  }
}