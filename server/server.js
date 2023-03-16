const express = require("express");
const app = express();
const port = 3000;

const scrapeRouter = require("./routes/scrapeRoutes");

app.use(express.json());
app.use(scrapeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
