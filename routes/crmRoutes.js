const express = require("express");
const routes = express.Router();
const crmCtrl = require("../controllers/crmController");
const auth = require("../middlewares/auth");

routes.post("/add", auth.authEndecode, crmCtrl.addNewContact);
routes.get("/all-contact", auth.authEndecode, crmCtrl.getAll);
routes.get("/:id", auth.authEndecode, crmCtrl.getOneContact);
routes.put("/:id", auth.authEndecode, crmCtrl.updateContact);
routes.delete("/:id", auth.authEndecode, crmCtrl.removeContact);

module.exports = routes;
