const express = require('express')
const router = express.Router();

const { getTokenData } = require("../utils/token");

const authService = require("../services/authService")

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => authService.login(req, res));

router.post("/signup", async (req, res) =>  authService.signup(req, res));

router.post("/verify", async (req, res) =>  getTokenData(req, res));


module.exports = router