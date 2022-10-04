const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json())
app.use(cors())


let port = 4005;

let events = [];

app.post("/events", async (req, res) => {
    const event = req.body;

    events.push(event);

    try {
        // await axios.post("http://localhost:4000/events", event);        
        await axios.post("http://posts-srv:4000/events", event);        
    } catch (error) {
        
    }

    try {
        // await axios.post("http://localhost:4001/events", event);        
        await axios.post("http://comments-srv:4001/events", event);        
    } catch (error) {
    }

    try {
        // await axios.post("http://localhost:4002/events", event);        
        await axios.post("http://query-srv:4002/events", event);        
    } catch (error) {
    }

    try {
        // await axios.post("http://localhost:4003/events", event);        
        await axios.post("http://moderation-srv:4003/events", event);        
    } catch (error) {
    }

    res.send({})
})



app.get("/events", async (req, res) => {
    res.send(events)
})




app.listen(port, () => {
    console.log(`event-bus listening in port : ${port}`)
})