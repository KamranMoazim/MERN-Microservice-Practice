const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const {randomBytes} = require("crypto")

const app = express();
app.use(bodyParser.json())
app.use(cors())


let port = 4002;

let posts = {}


const handleEvent = (type, data) => {

    if(type === "PostCreated"){
        const {id, title} = data;
        posts[id] = {id, title, comments:[]};
    } 

    if (type === "CommentCreated"){
        const {id, content, postId, status} = data;
        posts[postId].comments.push({id, content, status});
    }

    if (type === "CommentUpdated"){
        const {id, content, postId, status} = data;
        let comment = posts[postId].comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }

}

app.get("/posts", (req, res) => {
    res.send(posts);
})

app.post("/events", (req, res) => {
    console.log("Event Received ", req.body.type);

    const {type, data} = req.body;

    handleEvent(type, data)

    res.send({})
})

app.listen(port, async () => {
    console.log(`query listening in port : ${port}`)

    const res = await axios.get("http://localhost:4005/events")

    for (const event of res.data) {
        console.log("Processing event ", event)
        handleEvent(event.type, event.data);    
    }
}) 
