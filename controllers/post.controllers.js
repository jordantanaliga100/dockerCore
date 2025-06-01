const Post = require("../models/post.model");

// GET all items
exports.GET_ALL_ITEMS = async (req, res) => {
  try {
    const items = await Post.find({});
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching items",
      error: error.message,
    });
  }
};

// CREATE a new item
exports.CREATE_ITEM = async (req, res) => {
  console.log(" post request", req.body);

  try {
    const newItem = await Post.create(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating item",
      error: error.message,
    });
  }
};

// READ an item by ID
exports.GET_ITEM_BY_ID = async (req, res) => {
  try {
    const item = await Post.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching item",
      error: error.message,
    });
  }
};

// UPDATE an item by ID
exports.UPDATE_ITEM = async (req, res) => {
  try {
    const updatedItem = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating item",
      error: error.message,
    });
  }
};

// DELETE an item by ID
exports.DELETE_ITEM = async (req, res) => {
  try {
    const deletedItem = await Post.findByIdAndDelete(req.params.id);
    if (deletedItem === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.status(204).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting item",
      error: error.message,
    });
  }
};
