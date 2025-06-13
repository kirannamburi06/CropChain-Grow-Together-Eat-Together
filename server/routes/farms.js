import express from 'express';
import Farm from '../models/Farm.js';
import Token from '../models/Token.js';
import { authenticateToken, requireFarmer } from '../middleware/auth.js';

const router = express.Router();

// Get all farms
router.get('/', async (req, res) => {
  try {
    const { search, cropType, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { cropType: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Crop type filter
    if (cropType) {
      query.cropType = cropType;
    }
    
    // Price filters
    if (minPrice || maxPrice) {
      query.tokenPrice = {};
      if (minPrice) query.tokenPrice.$gte = Number(minPrice);
      if (maxPrice) query.tokenPrice.$lte = Number(maxPrice);
    }

    const farms = await Farm.find(query)
      .populate('farmerId', 'name profileImage')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Farm.countDocuments(query);

    // Transform the data to match frontend expectations
    const transformedFarms = farms.map(farm => ({
      ...farm.toObject(),
      farmer: farm.farmerId
    }));

    res.json({
      farms: transformedFarms,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get farms error:', error);
    res.status(500).json({ error: 'Failed to fetch farms' });
  }
});

// Get farm by ID
router.get('/:id', async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id)
      .populate('farmerId', 'name profileImage email');
    
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    // Transform the data to match frontend expectations
    const transformedFarm = {
      ...farm.toObject(),
      farmer: farm.farmerId
    };

    res.json({ farm: transformedFarm });
  } catch (error) {
    console.error('Get farm error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid farm ID' });
    }
    
    res.status(500).json({ error: 'Failed to fetch farm' });
  }
});

// Create farm (farmers only)
router.post('/', authenticateToken, requireFarmer, async (req, res) => {
  try {
    const {
      name,
      description,
      cropType,
      location,
      image,
      fundingGoal,
      tokenPrice,
      totalTokens,
      harvestDate,
      plantingDate
    } = req.body;

    // Validation
    if (!name || !description || !cropType || !location || !image || 
        !fundingGoal || !tokenPrice || !totalTokens || !harvestDate || !plantingDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate numeric fields
    if (isNaN(fundingGoal) || fundingGoal <= 0) {
      return res.status(400).json({ error: 'Funding goal must be a positive number' });
    }

    if (isNaN(tokenPrice) || tokenPrice <= 0) {
      return res.status(400).json({ error: 'Token price must be a positive number' });
    }

    if (isNaN(totalTokens) || totalTokens <= 0) {
      return res.status(400).json({ error: 'Total tokens must be a positive number' });
    }

    // Validate dates
    const plantingDateObj = new Date(plantingDate);
    const harvestDateObj = new Date(harvestDate);
    
    if (harvestDateObj <= plantingDateObj) {
      return res.status(400).json({ error: 'Harvest date must be after planting date' });
    }

    const farm = new Farm({
      farmerId: req.user._id,
      name: name.trim(),
      description: description.trim(),
      cropType,
      location: location.trim(),
      image,
      fundingGoal: Number(fundingGoal),
      tokenPrice: Number(tokenPrice),
      totalTokens: Number(totalTokens),
      availableTokens: Number(totalTokens),
      harvestDate: harvestDateObj,
      plantingDate: plantingDateObj
    });

    await farm.save();
    await farm.populate('farmerId', 'name profileImage');

    // Transform the data to match frontend expectations
    const transformedFarm = {
      ...farm.toObject(),
      farmer: farm.farmerId
    };

    res.status(201).json({
      message: 'Farm created successfully',
      farm: transformedFarm
    });
  } catch (error) {
    console.error('Create farm error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    
    res.status(500).json({ error: 'Failed to create farm' });
  }
});

// Update farm (farm owner only)
router.put('/:id', authenticateToken, requireFarmer, async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    if (farm.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this farm' });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        farm[key] = updates[key];
      }
    });

    await farm.save();
    await farm.populate('farmerId', 'name profileImage');

    // Transform the data to match frontend expectations
    const transformedFarm = {
      ...farm.toObject(),
      farmer: farm.farmerId
    };

    res.json({
      message: 'Farm updated successfully',
      farm: transformedFarm
    });
  } catch (error) {
    console.error('Update farm error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid farm ID' });
    }
    
    res.status(500).json({ error: 'Failed to update farm' });
  }
});

// Delete farm (farm owner only)
router.delete('/:id', authenticateToken, requireFarmer, async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    if (farm.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this farm' });
    }

    await Farm.findByIdAndDelete(req.params.id);

    res.json({ message: 'Farm deleted successfully' });
  } catch (error) {
    console.error('Delete farm error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid farm ID' });
    }
    
    res.status(500).json({ error: 'Failed to delete farm' });
  }
});

// Get farms by farmer
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const farms = await Farm.find({ farmerId: req.params.farmerId })
      .populate('farmerId', 'name profileImage')
      .sort({ createdAt: -1 });

    // Transform the data to match frontend expectations
    const transformedFarms = farms.map(farm => ({
      ...farm.toObject(),
      farmer: farm.farmerId
    }));

    res.json({ farms: transformedFarms });
  } catch (error) {
    console.error('Get farmer farms error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid farmer ID' });
    }
    
    res.status(500).json({ error: 'Failed to fetch farmer farms' });
  }
});

// Purchase tokens
router.post('/:id/purchase', authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    const farm = await Farm.findById(req.params.id);
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    if (farm.availableTokens < quantity) {
      return res.status(400).json({ error: 'Not enough tokens available' });
    }

    const totalPrice = farm.tokenPrice * quantity;

    // Create token purchase record
    const token = new Token({
      farmId: farm._id,
      userId: req.user._id,
      quantity,
      totalPrice
    });

    await token.save();

    // Update farm
    farm.availableTokens -= quantity;
    farm.currentFunding += totalPrice;
    
    // Update status if fully funded
    if (farm.availableTokens === 0) {
      farm.status = 'funded';
    }
    
    await farm.save();

    res.status(201).json({
      message: 'Tokens purchased successfully',
      token,
      farm
    });
  } catch (error) {
    console.error('Purchase tokens error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid farm ID' });
    }
    
    res.status(500).json({ error: 'Failed to purchase tokens' });
  }
});

export default router;