const express = require("express");
const app = express();

const db = require('./config/mongoose-connection')

const cookieParser = require("cookie-parser");
const path = require("path");
const index = require('./routes/index')
const ownersRouter = require('./routes/ownersRouter')
const productsRouter = require('./routes/productsRouter')
const usersRouter = require('./routes/usersRouter')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use('/owners', ownersRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/', index)

// app.get('/', (req,res)=> {
//     console.log(process.env.NODE_ENV)
// })

app.listen(3000, () => {
    console.log("server running");
});
