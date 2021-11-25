const express = require('express');
const router = express.Router();

//controllers
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
} = require('../controllers/task')

//routes

//all tasks
router.route('/')
.get(getAllTasks)
.post(createTask)
//single task
router.route('/:id')
.get(getSingleTask)
.patch(updateTask)
.delete(deleteTask)














module.exports = router