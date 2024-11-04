import { body, validationResult } from 'express-validator';
import handleError from '../errors/handleError.js'
// Validation for creating an example
export const createExampleValidation = [
    body('name') // Assuming the example has a 'name' field
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 1 }).withMessage('Name must be at least 1 character long'),
    body('description') // Assuming the example has a 'description' field
        .optional() // Allow this field to be optional
        .isString().withMessage('Description must be a string')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
];

// Validation for updating an example
export const updateExampleValidation = [
    body().custom((value, { req }) => {
        // Check if the request body is empty
        if (Object.keys(req.body).length === 0) {
            throw new Error('Must at least fill one input');
        }
        return true; // Valid input
    }),
];

// Middleware to validate request and handle errors
export const validate = (req, res, next) => {
    const errors = validationResult(req); // Get validation errors

    if (errors.isEmpty()) {
        return next(); // No errors, proceed to the next middleware
    }

    // Use handleError to respond with validation errors
    return handleError(res, null, "Validation failed", 400); // 400 Bad Request
};
