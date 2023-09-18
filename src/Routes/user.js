const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/create', userController.addUser);
router.get('/listUsers', userController.getUsers);
router.get('/:id/approve', userController.approveUser);
router.get('/:id', userController.getUser);

module.exports = router;
