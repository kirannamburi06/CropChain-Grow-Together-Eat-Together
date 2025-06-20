export const mockFarms = [
  {
    id: '1',
    farmerId: '1',
    farmerName: 'John Farmer',
    farmerImage: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg',
    name: 'Green Valley Organics',
    description: 'We grow sustainable, organic vegetables using traditional farming methods. Our focus is on quality, taste, and environmental stewardship.',
    cropType: 'Organic Vegetables',
    location: 'Napa Valley, CA',
    image: 'https://images.pexels.com/photos/1153513/pexels-photo-1153513.jpeg',
    fundingGoal: 10000,
    currentFunding: 6500,
    tokenPrice: 50,
    totalTokens: 200,
    availableTokens: 70,
    harvestDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
    plantingDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    farmerId: '1',
    farmerName: 'John Farmer',
    farmerImage: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg',
    name: 'Sunshine Apple Orchard',
    description: 'Our family-owned orchard produces the juiciest, crispest apples in the region. We use sustainable practices and minimal pesticides.',
    cropType: 'Apples',
    location: 'Washington State',
    image: 'https://images.pexels.com/photos/1637442/pexels-photo-1637442.jpeg',
    fundingGoal: 15000,
    currentFunding: 3750,
    tokenPrice: 75,
    totalTokens: 200,
    availableTokens: 150,
    harvestDate: new Date(new Date().setMonth(new Date().getMonth() + 5)).toISOString(),
    plantingDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    farmerId: '3',
    farmerName: 'Maria Rodriguez',
    farmerImage: 'https://images.pexels.com/photos/4993272/pexels-photo-4993272.jpeg',
    name: 'Heritage Grain Collective',
    description: 'We are reviving ancient grains with modern sustainable farming practices. Our products include rare wheat varieties, barley, and rye.',
    cropType: 'Heritage Grains',
    location: 'Montana',
    image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg',
    fundingGoal: 25000,
    currentFunding: 18750,
    tokenPrice: 100,
    totalTokens: 250,
    availableTokens: 62,
    harvestDate: new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString(),
    plantingDate: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    farmerId: '4',
    farmerName: 'James Wilson',
    farmerImage: 'https://images.pexels.com/photos/3760316/pexels-photo-3760316.jpeg',
    name: 'Berry Good Farms',
    description: 'Specializing in a variety of organically grown berries including strawberries, blueberries, and blackberries. Perfect for direct consumption or preserves.',
    cropType: 'Organic Berries',
    location: 'Oregon',
    image: 'https://images.pexels.com/photos/9260916/pexels-photo-9260916.jpeg',
    fundingGoal: 12000,
    currentFunding: 9600,
    tokenPrice: 40,
    totalTokens: 300,
    availableTokens: 60,
    harvestDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString(),
    plantingDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    farmerId: '5',
    farmerName: 'Amanda Chen',
    farmerImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    name: 'Sunny Side Up Eggs',
    description: 'Free-range, pasture-raised chickens producing the most nutritious and delicious eggs. Our hens are humanely raised with organic feed.',
    cropType: 'Free-Range Eggs',
    location: 'Vermont',
    image: 'https://images.pexels.com/photos/583828/pexels-photo-583828.jpeg',
    fundingGoal: 8000,
    currentFunding: 2000,
    tokenPrice: 25,
    totalTokens: 320,
    availableTokens: 240,
    harvestDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    plantingDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockTokens = [
  {
    id: '1',
    farmId: '1',
    userId: '2',
    quantity: 20,
    totalPrice: 1000,
    purchaseDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
  },
  {
    id: '2',
    farmId: '3',
    userId: '2',
    quantity: 15,
    totalPrice: 1500,
    purchaseDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  },
  {
    id: '3',
    farmId: '4',
    userId: '2',
    quantity: 25,
    totalPrice: 1000,
    purchaseDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  },
];