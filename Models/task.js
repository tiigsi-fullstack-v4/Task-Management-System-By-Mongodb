const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please the name is required"],
        maxlength: [200, "The name can't be more than 200 characters long"],
        trim: true,

    },
    status: {
        type: String,
        default: "pending"
    },
    description : {
        type: String,
        default: null
    },
    dueDate: {
        type: String,
        default: null,
    }
})
module.exports = mongoose.model("Task", TaskSchema);