const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController')

const express = require('express');
const router = express.Router();

router.route('/users').get(getAllUsers);
router.route('/users/:id').get(getSingleUser).patch(updateUser);
router.route('/users/profile').get(showCurrenUser).patch(updateUserPassword);

