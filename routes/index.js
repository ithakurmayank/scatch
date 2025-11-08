const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error, isLoggedIn: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
    const products = await productModel.find();
    const success = req.flash("success");
    res.render("shop", { success, products });
});

router.get("/addtocart/:productId", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success", "Product added to cart");
    res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async (req, res) => {
    const user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");
    const finalAmount = user.cart.reduce((sum, item) => {
        const discountAmount = (item.price * item.discount) / 100;
        const finalPrice = item.price - discountAmount;
        return sum + finalPrice;
    }, 0);
    res.render("cart", { user, finalAmount });
});

module.exports = router;
