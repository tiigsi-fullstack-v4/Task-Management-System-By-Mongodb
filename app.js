const express = require("express");
const { tasks } = require("./routes/tasks");
const connectDB = require("./Db/connect");
const app = express();
const dotenv = require('dotenv');
const notFound = require("./Middleware/not_found");
const errorHandlerMiddleware = require("./Middleware/error");
dotenv.config();
const mongourl = process.env.MongoURI;
// Middle wares
app.use(express.json());
//Static folders
app.use(express.static('./public'));
// routes
app.use("/api/v1/tasks",  tasks)

app.use(notFound)
app.use(errorHandlerMiddleware);
const port = 3000;

const start = async () => {
    try {
        await connectDB(mongourl);
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.log(error);
        
    }
}

start();


