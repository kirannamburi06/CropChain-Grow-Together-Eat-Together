import { mockFarms } from '../data/mockData.js';

export class HomePage {
  render(container) {
    const featuredFarms = mockFarms.slice(0, 3);

    container.innerHTML = `
      <!-- Hero Section -->
      <section class="relative bg-green-600 text-white">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-90"></div>
          <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg')] bg-cover bg-center mix-blend-overlay"></div>
        </div>

        <div class="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Grow Together, Eat Together
            </h1>
            <p class="text-xl md:text-2xl mb-8 leading-relaxed">
              Connect with local farmers, support sustainable agriculture, and
              enjoy the freshest produce while making a difference.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="/farms" onclick="navigate('/farms'); return false;" 
                 class="inline-flex items-center justify-center px-6 py-3 text-lg border border-white text-white hover:bg-white/10 font-semibold rounded-md transition-colors">
                Support Now
              </a>
              <a href="/signup" onclick="navigate('/signup'); return false;" 
                 class="inline-flex items-center justify-center px-6 py-3 text-lg border border-white text-white hover:bg-white/10 font-semibold rounded-md transition-colors">
                Join CropChain
              </a>
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path
              fill="#ffffff"
              fill-opacity="1"
              d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,80C1120,64,1280,64,1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">
              How CropChain Works
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, transparent process that connects farmers with
              supporters for mutual benefit.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="relative bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-green-600 transition-transform duration-300 hover:-translate-y-2">
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div class="pt-8 p-6 text-center">
                <i data-lucide="dollar-sign" class="mx-auto mb-4 text-green-600 w-12 h-12"></i>
                <h3 class="text-xl font-semibold mb-3">Support a Farm</h3>
                <p class="text-gray-600">
                  Browse farming projects and purchase support tokens to help
                  farmers raise capital for planting and growing crops.
                </p>
              </div>
            </div>

            <div class="relative bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-green-600 transition-transform duration-300 hover:-translate-y-2">
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div class="pt-8 p-6 text-center">
                <i data-lucide="leaf" class="mx-auto mb-4 text-green-600 w-12 h-12"></i>
                <h3 class="text-xl font-semibold mb-3">
                  Farmers Grow Crops
                </h3>
                <p class="text-gray-600">
                  With your support, farmers can focus on what they do best -
                  growing high-quality, sustainable produce with care.
                </p>
              </div>
            </div>

            <div class="relative bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-green-600 transition-transform duration-300 hover:-translate-y-2">
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div class="pt-8 p-6 text-center">
                <i data-lucide="shopping-basket" class="mx-auto mb-4 text-green-600 w-12 h-12"></i>
                <h3 class="text-xl font-semibold mb-3">
                  Receive Your Rewards
                </h3>
                <p class="text-gray-600">
                  After harvest, get fresh produce or a share of profits based
                  on your support tokens. Everyone wins!
                </p>
              </div>
            </div>
          </div>

          <div class="text-center mt-12">
            <a href="/farms" onclick="navigate('/farms'); return false;" 
               class="inline-flex items-center justify-center px-6 py-3 text-lg bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors">
              Browse Farms
              <i data-lucide="chevron-right" class="ml-1 w-4 h-4"></i>
            </a>
          </div>
        </div>
      </section>

      <!-- Featured Farms -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center mb-10">
            <h2 class="text-3xl font-bold text-gray-800">Featured Farms</h2>
            <a href="/farms" onclick="navigate('/farms'); return false;"
               class="text-green-600 font-medium hover:text-green-700 flex items-center">
              View All
              <i data-lucide="chevron-right" class="ml-1 w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${featuredFarms.map(farm => this.renderFarmCard(farm)).join('')}
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">
              What Our Community Says
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from farmers and supporters who are part of the
              CropChain ecosystem.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg"
                  alt="Farmer Mike"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 class="font-semibold text-gray-800">Mike Johnson</h4>
                  <p class="text-gray-600 text-sm">Farmer, Green Acres</p>
                </div>
              </div>
              <p class="text-gray-700 italic">
                "CropChain has transformed how I finance my farm. Instead of
                taking on debt, I now have supporters who believe in my vision
                and share in my success."
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                  alt="Sarah Thompson"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 class="font-semibold text-gray-800">
                    Sarah Thompson
                  </h4>
                  <p class="text-gray-600 text-sm">Supporter</p>
                </div>
              </div>
              <p class="text-gray-700 italic">
                "I love knowing exactly where my food comes from and that I'm
                helping a real farmer grow their business. The fresh produce I
                receive is just a bonus!"
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3760316/pexels-photo-3760316.jpeg"
                  alt="Daniel Lee"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 class="font-semibold text-gray-800">Daniel Lee</h4>
                  <p class="text-gray-600 text-sm">Farmer, Fresh Fields</p>
                </div>
              </div>
              <p class="text-gray-700 italic">
                "As a new farmer, traditional loans were out of reach. CropChain
                made it possible for me to start my organic vegetable farm with
                community support."
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-green-600 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-green-700 opacity-50"></div>
        <div class="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-green-500 opacity-30"></div>
        <div class="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-green-500 opacity-30"></div>

        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the Movement?
            </h2>
            <p class="text-xl mb-8">
              Whether you're a farmer looking for support or someone who wants
              to invest in sustainable agriculture, CropChain is for you.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <a href="/signup" onclick="navigate('/signup'); return false;"
                 class="inline-flex items-center justify-center px-6 py-3 text-lg bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-md rounded-md transition-colors">
                Join CropChain
              </a>
              <a href="/farms" onclick="navigate('/farms'); return false;"
                 class="inline-flex items-center justify-center px-6 py-3 text-lg border border-white text-white hover:bg-white/10 font-semibold rounded-md transition-colors">
                Browse Farms
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div class="max-w-3xl mx-auto">
            <div class="space-y-6">
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">
                  How do support tokens work?
                </h3>
                <p class="text-gray-700">
                  Support tokens represent your investment in a farm's crops.
                  Each token has a specific value and entitles you to either
                  receive a portion of the harvest or a share of the profits
                  when crops are sold, depending on the farm's offering.
                </p>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">
                  What happens if a crop fails?
                </h3>
                <p class="text-gray-700">
                  Farming involves inherent risks. While farmers do their best
                  to mitigate these risks, crop failures can happen. Each farm
                  specifies their policy for crop failures in their terms, which
                  may include partial refunds, credits toward future harvests,
                  or other arrangements.
                </p>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">
                  How do I receive my produce?
                </h3>
                <p class="text-gray-700">
                  Delivery methods vary by farm and location. Some farms offer
                  pickup options, while others arrange for delivery. The
                  specific logistics are detailed in each farm's profile and
                  will be communicated to supporters as harvest time approaches.
                </p>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">
                  Can I sell my tokens?
                </h3>
                <p class="text-gray-700">
                  Currently, tokens are non-transferrable and are tied to your
                  account. We're exploring options for a secondary market in the
                  future that would allow supporters to transfer or sell their
                  tokens to others.
                </p>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">
                  I'm a farmer. How do I get started?
                </h3>
                <p class="text-gray-700">
                  Simply sign up for an account, complete your profile selecting
                  "Farmer" as your role, and you'll be guided through the
                  process of creating your farm profile and first funding
                  campaign.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
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
              <span>$${farm.currentFunding.toLocaleString()} of $${farm.fundingGoal.toLocaleString()}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                class="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style="width: ${Math.min(percentFunded, 100)}%"
              ></div>
            </div>
            
            <div class="mt-3 flex items-center space-x-2">
              <div class="text-xs text-gray-500">
                <span class="font-medium text-gray-800">$${farm.tokenPrice}</span> per token
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
              ${farm.farmerImage ? 
                `<img src="${farm.farmerImage}" alt="${farm.farmerName}" class="w-8 h-8 rounded-full object-cover mr-2">` :
                `<div class="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2">${farm.farmerName.charAt(0)}</div>`
              }
              <span class="text-sm font-medium">${farm.farmerName}</span>
            </div>
            
            <a href="/farms/${farm.id}/support" onclick="navigate('/farms/${farm.id}/support'); return false;"
               class="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors">
              Support Now
            </a>
          </div>
        </div>
      </div>
    `;
  }
}