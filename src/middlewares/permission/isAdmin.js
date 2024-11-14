import jwt from "jsonwebtoken";
import handleError from "../errors/handleError.js";

const isAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return handleError(res, null, "No token provided", 403);
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user is an admin
    if (decoded.isAdmin) {
      next();
    } else {
      return handleError(res, null, "Access denied. Admins only", 403); // Forbidden
    }
  } catch (error) {
    return handleError(res, error, "Unauthorized access. ", 401); // Unauthorized
  }
};

export default isAdmin;
