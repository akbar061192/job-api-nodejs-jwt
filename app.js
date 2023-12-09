const express = require("express");
const connectDB = require("./db/connect");
require("dotenv").config();
require("express-async-errors");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");
const authentication = require("./middlewares/authentication");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.json({ msg: "working route" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authentication, jobsRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

const startUpApp = async () => {
  try {
    console.log(`connecting to db using ${MONGO_DB_URI}`);
    await connectDB(MONGO_DB_URI);
    console.log("connected to db...");
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startUpApp();
