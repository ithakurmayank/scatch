const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/create", isLoggedIn, upload.single("image"), async (req, res) => {
    const { name, price, discount, bgcolor, panelColor, textcolor } = req.body;
    try {
        await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelColor,
            textcolor,
        });
        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;
