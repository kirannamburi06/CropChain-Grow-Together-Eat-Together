import express from 'express';
import User from '../models/User.js';
import Token from '../models/Token.js';
import Farm from '../models/Farm.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['name', 'userType', 'profileImage', 'phone', 'address'];
    
    // Filter allowed updates
    const filteredUpdates = {};
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      filteredUpdates,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user's tokens
router.get('/tokens', authenticateToken, async (req, res) => {
  try {
    const tokens = await Token.find({ userId: req.user._id })
      .populate('farmId', 'name image cropType harvestDate tokenPrice')
      .sort({ createdAt: -1 });

    res.json({ tokens });
  } catch (error) {
    console.error('Get user tokens error:', error);
    res.status(500).json({ error: 'Failed to fetch tokens' });
  }
});

// Get user's farms (for farmers)
router.get('/farms', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'farmer') {
      return res.status(403).json({ error: 'Farmer access required' });
    }

    const farms = await Farm.find({ farmerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ farms });
  } catch (error) {
    console.error('Get user farms error:', error);
    res.status(500).json({ error: 'Failed to fetch farms' });
  }
});

// Get dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType === 'farmer') {
      // Farmer dashboard data
      const farms = await Farm.find({ farmerId: req.user._id });
      const totalFarms = farms.length;
      const totalFunding = farms.reduce((sum, farm) => sum + farm.currentFunding, 0);
      const totalGoal = farms.reduce((sum, farm) => sum + farm.fundingGoal, 0);

      res.json({
        userType: 'farmer',
        farms,
        stats: {
          totalFarms,
          totalFunding,
          totalGoal,
          averageFunding: totalFarms > 0 ? totalFunding / totalFarms : 0
        }
      });
    } else {
      // Supporter dashboard data
      const tokens = await Token.find({ userId: req.user._id })
        .populate('farmId', 'name image cropType harvestDate tokenPrice');
      
      const totalInvestment = tokens.reduce((sum, token) => sum + token.totalPrice, 0);
      const totalTokens = tokens.reduce((sum, token) => sum + token.quantity, 0);
      const farmsSupported = new Set(tokens.map(token => token.farmId._id.toString())).size;

      res.json({
        userType: 'supporter',
        tokens,
        stats: {
          totalInvestment,
          totalTokens,
          farmsSupported
        }
      });
    }
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

export default router;