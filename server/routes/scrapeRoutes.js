const scrape = require("../puppeteer");

const express = require("express");
const router = express();

router.post("/scrape", async (req, res) => {
  const toolCountData = await scrape(
    req.body.tools,
    req.body.what,
    req.body.city,
    req.body.state,
    req.body.numJobs
  );
  res.send(toolCountData);
});

module.exports = router;
