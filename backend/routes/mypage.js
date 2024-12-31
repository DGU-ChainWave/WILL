const router = require('express').Router();
const User = require('../models/User');
const athenticates = require('../middlewares/authenticates');
const authenticateToken = athenticates.authenticateToken;

// mypage - user 정보
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json('User not found!');
    }
    const { password, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET txHash
router.get('/txHash', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // 사용자를 데이터베이스에서 찾습니다.
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // txHash를 반환합니다.
    return res.status(200).json({ txHash: user.txHash });
  } catch (error) {
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// PUT /api/users/:userId/updateTxHash
router.put('/updateTxHash', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { txHash } = req.body;

  try {
    // 사용자를 데이터베이스에서 찾습니다.
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // txHash를 업데이트합니다.
    user.txHash = txHash;
    await user.save();

    console.log(user);
    return res.status(200).json({ message: 'txHash가 업데이트되었습니다.' });
  } catch (error) {
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
