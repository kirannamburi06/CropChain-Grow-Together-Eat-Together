import express from 'express';
import Token from '../models/Token.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users/tokens
router.get('/tokens', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const tokens = await Token.find({ userId }).populate('farmId');

    const formattedTokens = tokens.map(token => ({
      farmId: token.farmId._id,
      quantity: token.quantity,
      totalPrice: token.totalPrice,
      farm: {
        name: token.farmId.name,
        image: token.farmId.image,
        cropType: token.farmId.cropType,
        harvestDate: token.farmId.harvestDate,
        currentFunding: token.farmId.currentFunding,
        fundingGoal: token.farmId.fundingGoal,
        tokenPrice: token.farmId.tokenPrice
      }
    }));

    res.json({ tokens: formattedTokens });
  } catch (error) {
    console.error('Error fetching user tokens:', error);
    res.status(500).json({ error: 'Failed to fetch tokens' });
  }
});

export default router;
