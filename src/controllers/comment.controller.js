import Comment from "../models/comment.model.js";
import handleError from "../middlewares/errors/handleError.js";

// create a new comment
const createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    return res.status(201).json({ payload: newComment });
  } catch (error) {
    handleError(res, error, "Error in creating comment", 500);
  }
};

// Get a single comment by ID
const getOneComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return handleError(res, null, "No comment found", 404);
    }

    return res.status(200).json({ payload: comment });
  } catch (error) {
    handleError(res, error, "Error in getting one comment", 500);
  }
};

// Get all comment
const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find();

    if (comments.length === 0) {
      return res.status(204).send(); // No content
    }

    return res.status(200).json({ payload: comments });
  } catch (error) {
    handleError(res, error, "Error in getting all comments", 500);
  }
};

// Update an comment by ID
const updateComment = async (req, res) => {
  try {
    const update = { text: req.body.text };

    const comment = await Comment.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true
    });

    if (!comment) {
      return handleError(res, null, "No data found", 404);
    }

    return res.status(200).json({ payload: comment });
  } catch (error) {
    handleError(res, error, "Error in updating comment", 500);
  }
};

// Delete an comment by ID
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return handleError(res, null, "No comment found", 404);
    }

    return res.status(200).json({ payload: "Comment deleted" });
  } catch (error) {
    handleError(res, error, "Error in deleting comment", 500);
  }
};

const commentController = {
  createComment,
  getOneComment,
  getAllComment,
  updateComment,
  deleteComment,
};

export default commentController;
