const express = require("express");
require("../models");
require("dotenv").config();
const router = express.Router();
const validator = require("../helpers/validator");
const client_controller = require("../controllers/client_controller");
const provider_controller = require("../controllers/provider_controller");

// User's routes
router.get("/client/get_all", client_controller.get_clients);
router.post(
  "/client/create",
  validator.add_new_client,
  client_controller.create_client
);
router.put(
  "/client/update",
  validator.edit_client,
  client_controller.update_client
);
router.delete("/client/delete", client_controller.delete_client);

// Provider's routes
router.get("/provider/get_all", provider_controller.get_providers);
router.post("/provider/create", provider_controller.create_provider);
router.put("/provider/update", provider_controller.update_provider);
router.delete("/provider/delete", provider_controller.delete_provider);

module.exports = router;
