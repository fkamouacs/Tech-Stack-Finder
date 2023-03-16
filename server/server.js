const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const scrapeRouter = require("./routes/scrapeRoutes");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSucessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(scrapeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
