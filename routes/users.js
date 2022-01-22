const { Router } = require('express');
const { check } = require('express-validator');

const {
        validateFields,
        validateJWT,
        adminRole,
        hasARole
 } = require('../middlewares')
 
const { validateRole, validateEmail, validateUserExistsByID  } = require('../helpers/db-validators');

const { usersGet, 
        userPut, 
        userPost,
        userDelete, 
        userPatch } = require('../controller/users');
const req = require('express/lib/request');




const router = Router();



router.get('/', usersGet);

router.put('/:id', [
        check('id', 'It is not a valid id').isMongoId(),
        check('id').custom( validateUserExistsByID ),
        check('role').custom( validateRole ),
        validateFields
],userPut);

router.post('/',[
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'The password must be more than 6 letters').isLength( {min: 6} ),
        check('email', 'The email is not valid').isEmail(),
        check('email').custom( validateEmail ),
        check('role').custom( validateRole ),
        validateFields
        ], userPost);

router.delete('/:id',[
        validateJWT,
        // adminRole,
        hasARole('ADMIN_ROLE', 'SALES_ROLE'),
        check('id', 'It is not a valid id').isMongoId(),
        check('id').custom( validateUserExistsByID ),
        validateFields
],userDelete);

router.patch('/', userPatch);



module.exports = router;

