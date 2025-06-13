export class Footer {
  render(container) {
    container.innerHTML = `
      <footer class="bg-gray-800 text-white">
        <div class="wave-top">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-white"></path>
          </svg>
        </div>
        
        <div class="container mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="md:col-span-1">
              <a href="/" onclick="navigate('/'); return false;" class="flex items-center space-x-2">
                <i data-lucide="leaf" class="text-green-500"></i>
                <span class="text-xl font-bold">CropChain</span>
              </a>
              <p class="mt-4 text-gray-300">
                Connecting farmers with supporters for sustainable agriculture.
              </p>
              <div class="flex space-x-4 mt-6">
                <a href="#" class="text-gray-300 hover:text-white transition-colors">
                  <i data-lucide="facebook"></i>
                </a>
                <a href="#" class="text-gray-300 hover:text-white transition-colors">
                  <i data-lucide="twitter"></i>
                </a>
                <a href="#" class="text-gray-300 hover:text-white transition-colors">
                  <i data-lucide="instagram"></i>
                </a>
                <a href="#" class="text-gray-300 hover:text-white transition-colors">
                  <i data-lucide="mail"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
              <ul class="space-y-2">
                <li>
                  <a href="/" onclick="navigate('/'); return false;" class="text-gray-300 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/farms" onclick="navigate('/farms'); return false;" class="text-gray-300 hover:text-white transition-colors">
                    Farms
                  </a>
                </li>
                <li>
                  <a href="/contact" onclick="navigate('/contact'); return false;" class="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-4">Support</h3>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
              <address class="not-italic text-gray-300">
                <p>123 Farm Road</p>
                <p>Harvest Valley, Earth</p>
                <p class="mt-2">Email: info@cropchain.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          
          <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© ${new Date().getFullYear()} CropChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}