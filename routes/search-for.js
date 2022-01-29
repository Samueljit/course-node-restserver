const { Router } = require('express');
const { searchFor } = require('../controller/search-for');

const router = Router();




router.get('/:collection/:term', searchFor)



module.exports = router;