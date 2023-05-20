const express = require(`express`)
require('express-async-errors')
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect.js')
app.use(express.json());
const port = process.env.PORT || 8080

// error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require('./middleware/error-handler')
app.use(express.json());

app.get('/',(req, res) => {
    res.send("Reddit server");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI); 
        app.listen(port, () => {
            console.log(`listening to port ${port}`)
        })
    }
    catch(error) {
        console.log(error);
    }
}
start();