// Middleware to verify token (authentication)
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
  
    if (!token) {
      return handleError(res, null, "No token, authorization denied", 403); // 403 Forbidden
    }
  
    try {
      // Verify the token using JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded data to the request object
      next(); // Proceed to the next middleware or route
    } catch (error) {
      return handleError(res, error, "Token is not valid", 403); // 403 Forbidden
    }
  };

  export default verifyToken