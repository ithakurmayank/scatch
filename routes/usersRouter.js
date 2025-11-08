const express = require("express");
const router = express.Router();
const { registerUser, loginUser , logout} = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
    res.send("users router");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout',isLoggedIn,  logout)

module.exports = router;
