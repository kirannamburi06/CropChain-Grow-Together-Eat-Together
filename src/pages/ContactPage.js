export class ContactPage {
  constructor() {
    this.isLoading = false;
    this.isSubmitted = false;
  }

  render(container) {
    container.innerHTML = `
      <div class="bg-gray-50 min-h-screen">
        <!-- Page Header -->
        <div class="bg-green-600 text-white py-16">
          <div class="container mx-auto px-4">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p class="text-xl max-w-3xl">
              Have questions or feedback? We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </div>
        
        <div class="container mx-auto px-4 py-12">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Contact Information -->
            <div>
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              
              <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                  <div class="p-6 flex items-start space-x-4">
                    <div class="bg-green-100 rounded-full p-3">
                      <i data-lucide="mail" class="h-6 w-6 text-green-600"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">Email Us</h3>
                      <p class="text-gray-600">info@cropchain.com</p>
                      <p class="text-gray-600">support@cropchain.com</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                  <div class="p-6 flex items-start space-x-4">
                    <div class="bg-green-100 rounded-full p-3">
                      <i data-lucide="phone" class="h-6 w-6 text-green-600"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">Call Us</h3>
                      <p class="text-gray-600">(123) 456-7890</p>
                      <p class="text-gray-500 text-sm">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                  <div class="p-6 flex items-start space-x-4">
                    <div class="bg-green-100 rounded-full p-3">
                      <i data-lucide="map-pin" class="h-6 w-6 text-green-600"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">Visit Us</h3>
                      <p class="text-gray-600">
                        123 Farm Road<br />
                        Harvest Valley, Earth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-8">
                <h3 class="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div class="flex space-x-4">
                  <a href="#" class="bg-gray-100 p-3 rounded-full hover:bg-green-100 transition-colors">
                    <i data-lucide="facebook" class="h-5 w-5 text-gray-700"></i>
                  </a>
                  <a href="#" class="bg-gray-100 p-3 rounded-full hover:bg-green-100 transition-colors">
                    <i data-lucide="twitter" class="h-5 w-5 text-gray-700"></i>
                  </a>
                  <a href="#" class="bg-gray-100 p-3 rounded-full hover:bg-green-100 transition-colors">
                    <i data-lucide="instagram" class="h-5 w-5 text-gray-700"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Contact Form -->
            <div class="lg:col-span-2">
              <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                  ${this.isSubmitted ? this.renderSuccessMessage() : this.renderContactForm()}
                </div>
              </div>
            </div>
          </div>
          
          <!-- FAQ Section -->
          <div class="mt-16">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                  <h3 class="font-semibold text-gray-800 mb-2">
                    How do I get started as a farmer?
                  </h3>
                  <p class="text-gray-600">
                    Sign up for an account, complete your profile as a farmer, and you'll be guided through creating your farm profile and first funding campaign.
                  </p>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                  <h3 class="font-semibold text-gray-800 mb-2">
                    How do supporters receive their produce?
                  </h3>
                  <p class="text-gray-600">
                    Each farm has its own delivery or pickup options. The specific logistics are detailed in the farm's profile and will be communicated to supporters as harvest time approaches.
                  </p>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                  <h3 class="font-semibold text-gray-800 mb-2">
                    What happens if a crop fails?
                  </h3>
                  <p class="text-gray-600">
                    Each farm specifies their policy for crop failures, which may include partial refunds, credits toward future harvests, or other arrangements. These terms are listed on each farm's page.
                  </p>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                  <h3 class="font-semibold text-gray-800 mb-2">
                    Can I sell my tokens?
                  </h3>
                  <p class="text-gray-600">
                    Currently, tokens are non-transferrable and tied to your account. We're exploring options for a secondary market in the future that would allow supporters to transfer or sell their tokens.
                  </p>
                </div>
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

  renderSuccessMessage() {
    return `
      <div class="text-center py-8">
        <i data-lucide="check-circle" class="mx-auto text-green-600 mb-4 w-16 h-16"></i>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h2>
        <p class="text-gray-600 mb-6">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <button id="send-another-btn" class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2">
          Send Another Message
        </button>
      </div>
    `;
  }

  renderContactForm() {
    return `
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
      
      <form id="contact-form" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
            <p id="name-error" class="mt-1 text-sm text-red-600 hidden"></p>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
            <p id="email-error" class="mt-1 text-sm text-red-600 hidden"></p>
          </div>
        </div>
        
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            id="subject"
            type="text"
            placeholder="How can we help you?"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
          <p id="subject-error" class="mt-1 text-sm text-red-600 hidden"></p>
        </div>
        
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            rows="6"
            placeholder="Tell us about your question or feedback..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          ></textarea>
          <p id="message-error" class="mt-1 text-sm text-red-600 hidden"></p>
        </div>
        
        <div class="flex justify-end">
          <button
            type="submit"
            id="submit-btn"
            class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white hover:bg-green-700 px-4 py-2"
          >
            <i data-lucide="send" class="mr-2 w-4 h-4"></i>
            <span id="submit-text">Send Message</span>
            <svg id="submit-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </div>
      </form>
    `;
  }

  setupEventListeners() {
    if (this.isSubmitted) {
      const sendAnotherBtn = document.getElementById('send-another-btn');
      if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', () => {
          this.isSubmitted = false;
          this.render(document.getElementById('main-content'));
        });
      }
    } else {
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };

    this.clearErrors();

    if (!this.validateForm(formData)) return;

    this.setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.isSubmitted = true;
      this.render(document.getElementById('main-content'));
    } catch (error) {
      console.error('Error sending message:', error);
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

    if (!formData.email.trim()) {
      this.showError('email', 'Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      this.showError('email', 'Email is invalid');
      isValid = false;
    }

    if (!formData.subject.trim()) {
      this.showError('subject', 'Subject is required');
      isValid = false;
    }

    if (!formData.message.trim()) {
      this.showError('message', 'Message is required');
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
    ['name', 'email', 'subject', 'message'].forEach(field => {
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
      text.textContent = loading ? 'Loading...' : 'Send Message';
      spinner.classList.toggle('hidden', !loading);
    }
  }
}