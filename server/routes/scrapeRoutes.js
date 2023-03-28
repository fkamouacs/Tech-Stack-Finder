const scrape = require("../puppeteer");

const express = require("express");
const router = express();

router.post("/scrape", async (req, res) => {
  const data = await scrape(
    req.body.tools,
    req.body.what,
    req.body.city,
    req.body.state,
    req.body.numJobs
  );
  res.send(data);
});

module.exports = router;
