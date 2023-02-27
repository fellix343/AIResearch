const Sequelize = require("../db");
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Game = sequelize.define("Games", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), unique: true },
    description: { type: DataTypes.STRING(2049) },
    studio: { type: DataTypes.STRING(255) },
    tags: { type: DataTypes.STRING(2049) },
});
module.exports = { Game };
