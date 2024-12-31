const router = require('express').Router();
const User = require('../models/User');
const athenticates = require('../middlewares/authenticates');
const authenticateToken = athenticates.authenticateToken;
const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');

router.post('/upload', authenticateToken, async (req, res) => {
  const { audio, nowDate } = req.body;

  const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Base64 문자열을 Buffer로 변환
    let audioBuffer;
    if (audio.includes('base64,')) {
      // Data URL 형식인 경우
      audioBuffer = Buffer.from(audio.split('base64,')[1], 'base64');
    } else {
      // 순수 Base64 문자열인 경우
      audioBuffer = Buffer.from(audio, 'base64');
    }

    // Buffer를 Readable Stream으로 변환
    const stream = Readable.from(audioBuffer);

    const options = {
      pinataMetadata: {
        name: `Will_Audio_${user.username}_${nowDate}`,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    };

    console.log('Uploading to Pinata...', 'Audio file size:', audioBuffer.length);
    const result = await pinata.pinFileToIPFS(stream, options);
    const hash = result.IpfsHash;

    return res.status(200).json({
      ipfsHash: hash,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${hash}`,
    });
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    return res.status(500).json({
      error: 'Failed to upload to Pinata',
      details: error.message,
    });
  }
});

module.exports = router;
