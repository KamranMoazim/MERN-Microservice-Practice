const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json())


let port = 4003;



app.post("/events", async (req, res) => {
    console.log("Event Received ", req.body.type);

    const {type, data} = req.body;

    // console.log(data)

    if (type === "CommentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved";
        // await axios.post("http://localhost:4005/events", {
        await axios.post("http://event-bus-srv:4005/events", {
            type:"CommentModerated",
            data:{
                id:data.id, 
                content:data.content,
                postId:data.postId,
                status
            }
        })
    }

    res.send({})
})

app.listen(port, () => {
    console.log(`posts listening in port : ${port}`)
})