const express = require('express');
const { createUser, updateUser, getUser } = require('../controllers/databaseController');

const router = express.Router();

router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.get('/users/:id', getUser);

module.exports = router;
