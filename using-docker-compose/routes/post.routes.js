const express = require("express");
const {
  GET_ALL_ITEMS,
  CREATE_ITEM,
  GET_ITEM_BY_ID,
  UPDATE_ITEM,
  DELETE_ITEM,
} = require("../controllers/post.controllers");
const authenticationMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// MODE TWO
router
  .route("/")
  .get(authenticationMiddleware, GET_ALL_ITEMS)
  .post(authenticationMiddleware, CREATE_ITEM);

router
  .route("/:id")
  .get(authenticationMiddleware, GET_ITEM_BY_ID)
  .patch(authenticationMiddleware, UPDATE_ITEM)
  .delete(authenticationMiddleware, DELETE_ITEM);

// Export the router
module.exports = router;
