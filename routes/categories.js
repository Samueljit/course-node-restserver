const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields } = require('../middlewares');
const { createCategory, getCategories } = require('../controller/categories');

const router = Router();

// get all categories - public
router.get('/', getCategories);

// one category by id - public
router.get('/:id', [
    // check('id').custom(categoryExist)
],
    (req, res) => {
    res.json('get - id');
});

// create category - private - anyone person with valid token 
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
], createCategory );

// update - private - anyone with valit token
router.put('/:id', (req, res) => {
    res.json('put');
});

// delete one category - admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});







module.exports = router;