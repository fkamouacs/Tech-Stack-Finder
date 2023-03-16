const scrape = require("../puppeteer");

const express = require("express");
const router = express();

router.post("/scrape", async (req, res) => {
  const data = await scrape("software+developer", "East+Setauket", "NY", 1);
  console.log(data);
  res.send(data);
});

module.exports = router;
