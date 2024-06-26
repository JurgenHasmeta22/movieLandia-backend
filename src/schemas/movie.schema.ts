import { body, param, query } from 'express-validator';

const allowedSortByProperties = [
    'id',
    'title',
    'photoSrc',
    'trailerSrc',
    'duration',
    'ratingImdb',
    'releaseYear',
    'description',
];

const allowedSortByPropertiesDetails = ['createdAt', 'rating'];

const movieQuerySchema = [
    query('sortBy')
        .optional()
        .custom((value) => {
            if (!value) return true;

            if (!allowedSortByProperties.includes(value)) {
                throw new Error('Invalid sortBy value');
            }

            return true;
        }),
    query('ascOrDesc').optional().isIn(['asc', 'desc']).withMessage('Invalid ascOrDesc value'),
    query('page').optional().isInt({ min: 1 }).withMessage('Invalid page value'),
    query('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Invalid pageSize value'),
    query('title').optional().isString().withMessage('Title must be a string'),
    query('filterValue').optional().isString().withMessage('Filter value must be a string'),
    query('filterName').optional().isIn(['title', 'releaseYear']).withMessage('Invalid filterName value'),
    query('filterOperator')
        .optional()
        .isIn(['equals', 'contains', 'startsWith', 'endsWith'])
        .withMessage('Invalid filterOperator value'),
];

const movieIdParamSchema = [param('id').isInt({ min: 1 }).withMessage('Invalid movie ID format')];

const movieTitleParamSchema = [
    param('title')
        .isString()
        // .trim()
        // .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Invalid movie title format'),
    query('ascOrDesc').optional().isIn(['asc', 'desc']).withMessage('Invalid ascOrDesc value'),
    query('page').optional().isInt({ min: 1 }).withMessage('Invalid page value'),
    query('upvotesPage').optional().isInt({ min: 1 }).withMessage('Invalid upvotesPage value'),
    query('downvotesPage').optional().isInt({ min: 1 }).withMessage('Invalid downvotesPage value'),
    query('sortBy')
        .optional()
        .custom((value) => {
            if (!value) return true;

            if (!allowedSortByPropertiesDetails.includes(value)) {
                throw new Error('Invalid sortBy value');
            }

            return true;
        }),
];

const movieSchemaUpdate = [
    body('title').optional().isString(),
    body('photoSrc').optional().isString(),
    body('trailerSrc').optional().isURL(),
    body('duration').optional().isString().isLength({ min: 1, max: 10 }),
    body('ratingImdb').optional().isFloat({ min: 0, max: 10 }),
    body('releaseYear').optional().isInt({ min: 1900, max: new Date().getFullYear() }),
    body('description').optional().isString().isLength({ min: 10, max: 200 }),
];

const movieSchemaPost = [
    body('title').isString(),
    body('photoSrc').isString(),
    body('trailerSrc').isURL(),
    body('duration').isString().isLength({ min: 1, max: 10 }),
    body('ratingImdb').isFloat({ min: 0, max: 10 }),
    body('releaseYear').isInt({ min: 1900, max: new Date().getFullYear() }),
    body('description').isString().isLength({ min: 10, max: 200 }),
];

export { movieSchemaPost, movieSchemaUpdate, movieQuerySchema, movieIdParamSchema, movieTitleParamSchema };
