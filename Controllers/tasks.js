const { CreateCustomError } = require('../Errors/custom-error');
const asyncWrapper = require('../Middleware/async');
const Task = require('../Models/task');


const getAllTasks = asyncWrapper(async (req, res) => {
      const gettedTasks = await Task.find();
      res.json({ tasks: gettedTasks }); // Directly send tasks without extra nesting
  });
  
const createTask = asyncWrapper(async (req, res) => {
            const task = await Task.create(req.body)
            res.status(201).json(task);
    });

const getTaskById = asyncWrapper( async (req, res) => {
        const {id: task_id} = req.params;
        const task = await Task.findOne({_id: task_id});
        if(!task){
            return next(CreateCustomError("The task with the id of " + task_id+  " not found.", 404));
        }
        res.json({task});
})
const updateTask = asyncWrapper( async (req, res) => {
    const { id } = req.params; // Get task id from the URL params
    const { name, completed, description, status } = req.body; // Get updated task data from the request body
      // Find the task by id and update it
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { name, completed, description, status },
        { new: true } // Ensure we return the updated task
      );
      // If no task was found, return an error response
      if (!updatedTask) {
        const error = new Error({message: "Task not found"})
            error.status = 404;
            error.message = "Task not found";
            return next(error);
      }
      // Send back the updated task wrapped in an object with the 'task' key
      res.json({ task: updatedTask });
  })


const deleteTask = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const task = await Task.findOneAndDelete({_id : id}); 
    if(!task){
        const error = new Error({message: "The task with the id of " + taskId + " not found."})
            error.status = 404;
            error.message = "The task with the id of " + taskId + " not found.";
            return next(error);
    }
    res.json({message: "Task deleted successfully."});
}) 

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
}