const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const session = require("cookie-session");

require("dotenv").config();

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "NUSPages",
    keys: ["orbital", "2020"],
    maxAge: 24 * 3600000, // 24 hours
  })
);

app.use("/auth", require("./routers/auth"));
app.use("/cards", require("./routers/cards"));
app.use("/portfolio", require("./routers/portfolio"));
app.use("/profile", require("./routers/profile"));

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(5000);
