require("dotenv").config();
const express = require("express");
const sequelize = require("./db.js");
const router = require("./router/mainRouter.js");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.use("/api", router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log("Server start on port:" + PORT));
    } catch (e) {
        console.log(e);
    }
};
start();
