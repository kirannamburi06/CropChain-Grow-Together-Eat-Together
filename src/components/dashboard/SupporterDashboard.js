
export class SupporterDashboard {
  constructor(authManager) {
    this.authManager = authManager;
    this.userTokens = [];
  }

  setUserTokens(tokens) {
    this.userTokens = tokens || [];
  }

  render(container) {
    const tokensByFarm = this.userTokens.reduce((acc, token) => {
      if (!acc[token.farmId]) acc[token.farmId] = [];
      acc[token.farmId].push(token);
      return acc;
    }, {});

    const farmTotals = Object.entries(tokensByFarm).map(([farmId, tokens]) => {
      const farm = tokens[0]?.farm;
      const totalTokens = tokens.reduce((sum, t) => sum + t.quantity, 0);
      const totalSpent = tokens.reduce((sum, t) => sum + t.totalPrice, 0);
      return {
        farmId,
        farmName: farm?.name || 'Unknown Farm',
        farmImage: farm?.image || '',
        cropType: farm?.cropType || 'Unknown',
        harvestDate: farm?.harvestDate,
        totalTokens,
        totalSpent,
        farm
      };
    });

    const walletTotal = this.userTokens.reduce((sum, token) => sum + token.totalPrice, 0);
    const totalTokenCount = this.userTokens.reduce((sum, token) => sum + token.quantity, 0);

    container.innerHTML = `
      <div>
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Your Wallet</h2>
          <div class="flex flex-col md:flex-row md:items-end gap-4">
            <div>
              <p class="text-sm text-gray-500">Total Investment</p>
              <p class="text-3xl font-bold text-green-600">₹${walletTotal.toLocaleString()}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Farms Supported</p>
              <p class="text-3xl font-bold text-gray-800">${farmTotals.length}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Total Tokens</p>
              <p class="text-3xl font-bold text-gray-800">${totalTokenCount}</p>
            </div>
            <div class="md:ml-auto">
              <a href="/farms" onclick="navigate('/farms'); return false;" class="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded">Support More Farms</a>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mb-6">Supported Projects</h2>
        ${farmTotals.length === 0 ? this.renderEmptyState() : this.renderSupportedFarms(farmTotals)}
      </div>`;

    if (window.lucide) window.lucide.createIcons();
  }

  renderEmptyState() {
    return `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="py-12 px-6 text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-2">No supported farms yet</h3>
          <p class="text-gray-600 mb-6">Start supporting local farmers and enjoy fresh produce.</p>
          <a href="/farms" onclick="navigate('/farms'); return false;" class="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded">Explore Farms</a>
        </div>
      </div>`;
  }

  renderSupportedFarms(farmTotals) {
    return `<div class="space-y-6">${farmTotals.map(f => this.renderSupportedFarmCard(f)).join('')}</div>`;
  }

  renderSupportedFarmCard(farmData) {
    const { farm } = farmData;
    if (!farm) return '';
    const percentFunded = (farm.currentFunding / farm.fundingGoal) * 100;

    return `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/4 h-48 md:h-auto">
            <img src="${farmData.farmImage}" alt="${farmData.farmName}" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-3/4 p-6">
            <h3 class="text-xl font-semibold text-gray-800">${farmData.farmName}</h3>
            <p class="text-gray-600 text-sm">${farmData.cropType}</p>
            <div class="text-sm text-gray-500 mt-1">
              <span>Harvest: ${new Date(farm.harvestDate).toLocaleDateString()}</span>
            </div>
            <div class="my-4">
              <div class="bg-gray-200 h-2.5 rounded-full">
                <div class="bg-green-600 h-2.5 rounded-full" style="width:${Math.min(percentFunded, 100)}%"></div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p class="text-gray-500">Your Investment</p>
                <p class="font-semibold">$${farmData.totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <p class="text-gray-500">Your Tokens</p>
                <p class="font-semibold">${farmData.totalTokens}</p>
              </div>
              <div>
                <p class="text-gray-500">Token Price</p>
                <p class="font-semibold">$${farm.tokenPrice}</p>
              </div>
            </div>
            <div class="mt-4 text-right">
              <a href="/farms/${farmData.farmId}" onclick="navigate('/farms/${farmData.farmId}'); return false;" class="text-green-600 hover:underline">View Farm →</a>
            </div>
          </div>
        </div>
      </div>`;
  }
}
