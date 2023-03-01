const express = require("express");
const proxy = require("express-http-proxy");
const mongoose = require("mongoose");

const { authenticate } = require("./utils/token");

const cors = require("cors");
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL, () => console.log("Connected to MongoDB"));

app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/cloud", proxy("http://127.0.0.1:8081/image/"));
app.use("/image", proxy("http://127.0.0.1:8081"));
app.use("/ml", authenticate, proxy("http://127.0.0.1:8082"));
app.use("/mail", authenticate, proxy("http://127.0.0.1:8083"));
app.use("/user", authenticate, proxy("http://127.0.0.1:8084"));
app.use("/property", authenticate, proxy("http://127.0.0.1:8085"));
app.use("/chat", authenticate, proxy("http://127.0.0.1:8086"));

app.listen(PORT, () => console.warn(`Running on http://127.0.0.1:${PORT}`));


