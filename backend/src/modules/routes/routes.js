const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  deleteTask,
  deleteAllTask
} = require('../controllers/task.controller');

// Tasks routes
router.get('/allTasks', getAllTasks);
router.post('/createTask', createNewTask);
router.patch('/updateTask', changeTaskInfo);
router.delete('/deleteTask', deleteTask);
router.delete('/deleteAllTask', deleteAllTask);


//User routes

module.exports = router;