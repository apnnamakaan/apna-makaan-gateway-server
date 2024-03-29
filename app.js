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
mongoose.connect(MONGO_URL);

app.use(cors());

const IMAGE_SERVER_URL = process.env.IMAGE_SERVER_URL;
const ML_SERVER_URL = process.env.ML_SERVER_URL;
const EMAIL_SERVER_URL = process.env.EMAIL_SERVER_URL;
const USER_SERVER_URL = process.env.USER_SERVER_URL;
const PROPERTY_SERVER_URL = process.env.PROPERTY_SERVER_URL;
const CHAT_SERVER_URL = process.env.CHAT_SERVER_URL;
const WS_SERVER = process.env.WS_SERVER;

app.get('/', (req, res) => res.send({ status: 'true', author: "Atanu Debnath", about: 'gatway server' }));
app.use("/auth", require("./routes/auth"));
app.use("/cloud", proxy(IMAGE_SERVER_URL + "/image/"));
app.use("/image", proxy(IMAGE_SERVER_URL));
app.use("/ml", authenticate, proxy(ML_SERVER_URL));
app.use("/mail", authenticate, proxy(EMAIL_SERVER_URL));
app.use("/user", authenticate, proxy(USER_SERVER_URL));
app.use("/property", authenticate, proxy(PROPERTY_SERVER_URL));
app.use("/chat", authenticate, proxy(CHAT_SERVER_URL));
app.use("/ws", proxy(WS_SERVER));

app.listen(PORT, '127.0.0.1', () => console.warn(`Running on PORT ${PORT}`));


