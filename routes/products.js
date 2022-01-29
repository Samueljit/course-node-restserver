const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, adminRole } = require('../middlewares');

const { createProduct,
        getProducts,
        getProduct,
        uptdateProduct,
        deleteProduct} = require('../controller/products');

        const { productExistByID, categoryExistByID } = require('../helpers/db-validators');

const router = Router();

// get all categories - public
router.get('/', getProducts);

// one category by id - public
router.get('/:id', [
    check('id', 'Is not an Mongo ID').isMongoId(),
    check('id').custom(productExistByID),
    validateFields
], getProduct);

// create category - private - anyone person with valid token 
router.post('/', [
    validateJWT,
    check('name', 'The Name is required').not().isEmpty(),
    check('category', 'Is not a valid mongo id').isMongoId(),
    check('category').custom( categoryExistByID ),
    validateFields,
], createProduct );

// update - private - anyone with valit token
router.put('/:id',[
    validateJWT,
    // check('category', 'Is not a valid mongo id').isMongoId(),
    check('name', 'The name is required').not().isEmpty(),
    check('id').custom( productExistByID),
    validateFields
], uptdateProduct);

// delete one category - admin
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'Is not an Mongo ID').isMongoId(),
    check('id').custom( productExistByID ),
    validateFields
], deleteProduct);



module.exports = router;