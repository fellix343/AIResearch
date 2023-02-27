const Router = require("express");
const router = new Router();
const MainGamingSearch = require("../controllers/findTakeAdd.js");

router.post("/addGameStore", MainGamingSearch.description);

//router.use("/findGamesInBase",);

module.exports = router;
