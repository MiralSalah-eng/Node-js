// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 4800;
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.get("/gettingData", (req,res) => {
    res.send(projectData).status(200).end()
})

app.post("/savingData", (req,res) => {
   projectData = req.body;
   res.send(projectData).status(200).end()
})
// Setup Server
app.listen(port, () => {
    console.log(`your server is runing on: http://localhost:${port}`);

})