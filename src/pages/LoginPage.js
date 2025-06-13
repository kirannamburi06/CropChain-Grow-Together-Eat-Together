export class LoginPage {
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
            <h2 class="mt-6 text-3xl font-bold text-gray-800">Welcome back</h2>
            <p class="mt-2 text-gray-600">
              Sign in to your CropChain account
            </p>
          </div>
          
          <div class="mt-8 space-y-6">
  <div class="grid grid-cols-2 gap-3">
    <button
      id="facebook-login"
      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      <i data-lucide="facebook" class="h-5 w-5 text-blue-600 mr-2"></i>
      <span>Facebook</span>
    </button>

    <button
      id="google-login"
      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      <i data-lucide="globe" class="h-5 w-5 text-red-500 mr-2"></i>
      <span>Google</span>
    </button>
  </div>
</div>

            
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <form id="login-form" class="space-y-6">
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
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div class="text-sm">
                  <a href="#" class="font-medium text-green-600 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                id="login-btn"
                class="w-full inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2"
              >
                <span id="login-text">Sign in</span>
                <svg id="login-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </form>
            
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Don't have an account?
                <a href="/signup" onclick="navigate('/signup'); return false;" class="font-medium text-green-600 hover:text-green-500">
                  Sign up
                </a>
              </p>
            </div>
            
            <div class="border-t border-gray-200 pt-4">
              <p class="text-sm text-center text-gray-600 mb-3">For demonstration purposes:</p>
              <div class="grid grid-cols-2 gap-3">
                <button
                  id="demo-farmer-btn"
                  class="inline-flex items-center justify-center py-2 px-4 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors"
                >
                  Login as Farmer
                </button>
                <button
                  id="demo-supporter-btn"
                  class="inline-flex items-center justify-center py-2 px-4 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors"
                >
                  Login as Supporter
                </button>
              </div>
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
    const form = document.getElementById('login-form');
    const demoFarmerBtn = document.getElementById('demo-farmer-btn');
    const demoSupporterBtn = document.getElementById('demo-supporter-btn');

    form.addEventListener('submit', (e) => this.handleSubmit(e));
    demoFarmerBtn.addEventListener('click', () => this.handleDemoLogin('farmer'));
    demoSupporterBtn.addEventListener('click', () => this.handleDemoLogin('supporter'));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    this.clearErrors();

    if (!this.validateForm(email, password)) return;

    this.setLoading(true);

    try {
      await this.authManager.login(email, password);
      navigate('/dashboard');
    } catch (error) {
      this.showError('email', 'Invalid credentials');
      this.showError('password', 'Invalid credentials');
    } finally {
      this.setLoading(false);
    }
  }

  async handleDemoLogin(userType) {
    if (this.isLoading) return;

    this.setLoading(true);

    try {
      if (userType === 'farmer') {
        await this.authManager.login('farmer@example.com', 'password');
      } else {
        await this.authManager.login('supporter@example.com', 'password');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      this.setLoading(false);
    }
  }

  validateForm(email, password) {
    let isValid = true;

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
    ['email', 'password'].forEach(field => {
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
    const btn = document.getElementById('login-btn');
    const text = document.getElementById('login-text');
    const spinner = document.getElementById('login-spinner');
    const demoButtons = [document.getElementById('demo-farmer-btn'), document.getElementById('demo-supporter-btn')];

    if (btn && text && spinner) {
      btn.disabled = loading;
      text.textContent = loading ? 'Loading...' : 'Sign in';
      spinner.classList.toggle('hidden', !loading);
      
      demoButtons.forEach(button => {
        if (button) button.disabled = loading;
      });
    }
  }
}