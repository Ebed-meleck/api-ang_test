const express = require("express");
const routes = express.Router();
const crmCtrl = require("../controllers/crmController");

routes.post("/add", crmCtrl.addNewContact);
routes.get("/all-contact", crmCtrl.getAll);
routes.get("/:id", crmCtrl.getOneContact);
routes.put("/update-one", crmCtrl.updateContact);
routes.delete("/remove", crmCtrl.removeContact);

module.exports = routes;
