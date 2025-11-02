const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
    res.send("owners router");
});

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        const owners = await ownerModel.find();
        console.log("owners: ", owners);
        if (owners.length) {
            return res
                .status(502)
                .send("You don't have permission to create a owner");
        }

        const { fullName, email, password } = req.body;
        const createdOwner = await ownerModel.create({
            fullName,
            email,
            password,
        });
        res.send(createdOwner)
    });
}

module.exports = router;
