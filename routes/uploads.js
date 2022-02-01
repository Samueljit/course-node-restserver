const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { fileUpload } = require('../controller/uploads');


const router = Router();

router.post('/', fileUpload)

module.exports = router;