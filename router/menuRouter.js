const express = require('express');
const router = express.Router();

const upload = require('../service/multer');
const { createMenu, getMenu, getMenuByType } = require('../controller/menuController');

router.post('/create-menu', upload.single("image"), createMenu);

router.get('/',getMenu);

router.get('/:type',getMenuByType);

module.exports = router;