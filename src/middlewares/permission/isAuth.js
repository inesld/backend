import jwt from 'jsonwebtoken';
import handleError from '../errors/handleError.js';

const isAuth = (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.token;
        // Check if the token exists
        if (!token) {
            return  handleError(res, null, "Unauthorized access. Please authenticate to access this resource.", 401);
                 }

        // Verify and decode the token
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return  handleError(res, error, "Unauthorized access. Please authenticate to access this resource.", 401);
            }

            // If the token is valid, proceed to the next middleware
            req.user = decoded;  // add decoded data to the request
            next();
        });
    } catch (error) {
        return  handleError(res, error, "Authentication Failled Server Error.", 500);
    }
};

export default isAuth;
