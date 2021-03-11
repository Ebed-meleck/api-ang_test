const express = require("express");
const routes = express.Router();
const authCtrl = require("../controllers/auth");

routes.post("/login", authCtrl.loginRoute);
routes.get("/logout", authCtrl.logout);

module.exports = routes;
