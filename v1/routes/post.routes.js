const express = require("express");
const {
  GET_ALL_ITEMS,
  CREATE_ITEM,
  GET_ITEM_BY_ID,
  UPDATE_ITEM,
  DELETE_ITEM,
} = require("../controllers/post.controllers");

const router = express.Router();

// MODE TWO
router.route("/").get(GET_ALL_ITEMS).post(CREATE_ITEM);

router.route("/:id").get(GET_ITEM_BY_ID).patch(UPDATE_ITEM).delete(DELETE_ITEM);

// Export the router
module.exports = router;
