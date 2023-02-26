const express = require("express");
const proxy = require("express-http-proxy");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const cors = require("cors");
const app = express();

const PORT = 5000;

const MONGO_URL =
    "mongodb+srv://root:root@cluster0.5p7pj.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URL, () => {
    console.log("Connected to MongoDB");
});

const { authenticate } = require("./utils/token");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/cloud", proxy("http://127.0.0.1:8081/image/"));
app.use("/image", proxy("http://127.0.0.1:8081"));
app.use("/ml", authenticate, proxy("http://127.0.0.1:8082"));
app.use("/mail", authenticate, proxy("http://127.0.0.1:8083"));
app.use("/user", authenticate, proxy("http://127.0.0.1:8084"));
app.use("/property", authenticate, proxy("http://127.0.0.1:8085"));

app.get("/", (req, res) => {
    res.send({
        status: "true",
        author: "Atanu Debnath",
        about: "API Gateway Server",
    });
});

app.listen(PORT, () => {
    console.log(`Running on http://127.0.0.1:${PORT}`);
});
