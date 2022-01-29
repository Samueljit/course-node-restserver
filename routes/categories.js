const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, adminRole } = require('../middlewares');
const { createCategory, 
        getCategories, 
        getCategory, 
        uptdateCategory, 
        deleteCategory} = require('../controller/categories');
const { categoryExistByID } = require('../helpers/db-validators');

const router = Router();

// get all categories - public
router.get('/', getCategories);

// one category by id - public
router.get('/:id', [
    check('id', 'Is not an Mongo ID').isMongoId(),
    check('id').custom(categoryExistByID),
    validateFields
], getCategory);

// create category - private - anyone person with valid token 
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
], createCategory );

// update - private - anyone with valit token
router.put('/:id',[
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'Is not a valid mongo id').isMongoId(),
    check('id').custom( categoryExistByID),
    validateFields
],
 uptdateCategory);

// delete one category - admin
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'Is not an Mongo ID').isMongoId(),
    check('id').custom( categoryExistByID),
    validateFields
], deleteCategory);



module.exports = router;