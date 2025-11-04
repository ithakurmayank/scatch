const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const registerUser = async (req, res) => {
    try {
        const { fullName, password, email } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res
                .status(401)
                .send("Account with this email already exists.");
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return res.send(err.message);
            else {
                const createdUser = await userModel.create({
                    fullName,
                    email,
                    password: hash,
                });

                const token = generateToken(createdUser);
                res.cookie("token", token);
                res.send("User created successfully");
            }
        });

        res.send(createdUser);
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.registerUser = registerUser;
