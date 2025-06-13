export class Navbar {
  constructor(authManager) {
    this.authManager = authManager;
    this.isOpen = false;
    this.isScrolled = false;
    this.showProfileMenu = false;
  }

  render(container) {
    this.container = container;
    this.updateNavbar();
    this.setupEventListeners();
  }

  updateNavbar() {
    const isHomePage = window.location.pathname === '/';
    const user = this.authManager.getCurrentUser();
    const isAuthenticated = this.authManager.isAuthenticated();

    this.container.innerHTML = `
      <nav class="fixed w-full z-50 transition-all duration-300 ${
        this.isScrolled || !isHomePage 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }">
        <div class="container mx-auto px-4 md:px-6">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <a href="/" class="flex items-center space-x-2" onclick="navigate('/'); return false;">
              <i data-lucide="leaf" class="${
                this.isScrolled || !isHomePage ? 'text-green-600' : 'text-white'
              } transition-colors duration-300"></i>
              <span class="text-xl font-bold transition-colors duration-300 ${
                this.isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'
              }">
                CropChain
              </span>
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-8">
              <a href="/farms" onclick="navigate('/farms'); return false;" 
                 class="font-medium transition-colors duration-300 hover:text-green-600 ${
                   this.isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
                 }">
                Farms
              </a>
              <a href="/contact" onclick="navigate('/contact'); return false;" 
                 class="font-medium transition-colors duration-300 hover:text-green-600 ${
                   this.isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
                 }">
                Contact
              </a>
              
              ${isAuthenticated ? this.renderAuthenticatedMenu(user, isHomePage) : this.renderUnauthenticatedMenu(isHomePage)}
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden">
              <button id="mobile-menu-btn" class="text-gray-500 hover:text-gray-700 focus:outline-none">
                <i data-lucide="${this.isOpen ? 'x' : 'menu'}" class="${this.isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu -->
        ${this.isOpen ? this.renderMobileMenu(isAuthenticated, user) : ''}
      </nav>
    `;

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderAuthenticatedMenu(user, isHomePage) {
    return `
      <div class="relative">
        <button id="profile-menu-btn" class="flex items-center space-x-2 focus:outline-none">
          ${user?.profileImage ? 
            `<img src="${user.profileImage}" alt="${user.name}" class="w-8 h-8 rounded-full object-cover border-2 border-green-500">` :
            `<div class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">${user?.name.charAt(0)}</div>`
          }
          <span class="font-medium transition-colors duration-300 ${
            this.isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
          }">
            ${user?.name.split(' ')[0]}
          </span>
        </button>
        
        ${this.showProfileMenu ? `
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <a href="/dashboard" onclick="navigate('/dashboard'); return false;" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
            <a href="/profile" onclick="navigate('/profile'); return false;" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            ${user?.userType === 'farmer' ? 
              '<a href="/farms/add" onclick="navigate(\'/farms/add\'); return false;" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Farm</a>' : 
              ''
            }
            <button id="logout-btn" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderUnauthenticatedMenu(isHomePage) {
    return `
      <div class="flex items-center space-x-4">
        <a href="/login" onclick="navigate('/login'); return false;" 
           class="font-medium transition-colors duration-300 hover:text-green-600 ${
             this.isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
           }">
          Log In
        </a>
        <a href="/signup" onclick="navigate('/signup'); return false;" 
           class="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors duration-300">
          Sign Up
        </a>
      </div>
    `;
  }

  renderMobileMenu(isAuthenticated, user) {
    return `
      <div class="md:hidden bg-white shadow-lg">
        <div class="px-4 pt-2 pb-4 space-y-3">
          <a href="/farms" onclick="navigate('/farms'); return false;" class="block py-2 text-gray-700 font-medium hover:text-green-600">Farms</a>
          <a href="/contact" onclick="navigate('/contact'); return false;" class="block py-2 text-gray-700 font-medium hover:text-green-600">Contact</a>
          
          ${isAuthenticated ? `
            <div class="pt-2 border-t border-gray-200">
              <div class="flex items-center space-x-3 py-2">
                ${user?.profileImage ? 
                  `<img src="${user.profileImage}" alt="${user.name}" class="w-8 h-8 rounded-full object-cover border-2 border-green-500">` :
                  `<div class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">${user?.name.charAt(0)}</div>`
                }
                <span class="font-medium text-gray-800">${user?.name}</span>
              </div>
            </div>
            
            <a href="/dashboard" onclick="navigate('/dashboard'); return false;" class="flex items-center py-2 text-gray-700 font-medium hover:text-green-600">
              <i data-lucide="user" class="mr-2"></i>
              Dashboard
            </a>
            
            <a href="/profile" onclick="navigate('/profile'); return false;" class="flex items-center py-2 text-gray-700 font-medium hover:text-green-600">
              <i data-lucide="user" class="mr-2"></i>
              Profile
            </a>
            
            ${user?.userType === 'farmer' ? 
              '<a href="/farms/add" onclick="navigate(\'/farms/add\'); return false;" class="flex items-center py-2 text-gray-700 font-medium hover:text-green-600">Add Farm</a>' : 
              ''
            }
            
            <button id="mobile-logout-btn" class="flex items-center w-full py-2 text-gray-700 font-medium hover:text-green-600">
              <i data-lucide="log-out" class="mr-2"></i>
              Sign Out
            </button>
          ` : `
            <div class="pt-2 border-t border-gray-200 flex flex-col space-y-2">
              <a href="/login" onclick="navigate('/login'); return false;" class="py-2 text-gray-700 font-medium hover:text-green-600">Log In</a>
              <a href="/signup" onclick="navigate('/signup'); return false;" class="bg-green-600 text-white px-4 py-2 rounded-md font-medium text-center hover:bg-green-700 transition-colors duration-300">Sign Up</a>
            </div>
          `}
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Scroll listener
    window.addEventListener('scroll', () => {
      const wasScrolled = this.isScrolled;
      this.isScrolled = window.scrollY > 10;
      if (wasScrolled !== this.isScrolled) {
        this.updateNavbar();
      }
    });

    // Mobile menu toggle
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('#mobile-menu-btn')) {
        this.isOpen = !this.isOpen;
        this.updateNavbar();
      }

      if (e.target.closest('#profile-menu-btn')) {
        this.showProfileMenu = !this.showProfileMenu;
        this.updateNavbar();
      }

      if (e.target.closest('#logout-btn') || e.target.closest('#mobile-logout-btn')) {
        this.authManager.logout();
        this.showProfileMenu = false;
        navigate('/');
      }
    });

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        if (this.showProfileMenu) {
          this.showProfileMenu = false;
          this.updateNavbar();
        }
      }
    });
  }

  updateAuthState() {
    this.updateNavbar();
  }
}