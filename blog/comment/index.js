const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const {randomBytes} = require("crypto")

const app = express();
app.use(bodyParser.json())
app.use(cors())


let port = 4001;

let commentsByPostID = {}

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostID[req.params.id] || []);
})

app.post("/posts/:id/comments", async (req, res) => {

    const postId = req.params.id;
    const comments = commentsByPostID[postId]?.comments || [];

    const commentId = randomBytes(4).toString("hex")
    const {content} = req.body;
    comments.push({id:commentId, content, status:"pending"})
    commentsByPostID[postId] = {};
    commentsByPostID[postId].comments = comments;


    try {
        // await axios.post("http://localhost:4005/events", {
        await axios.post("http://event-bus-srv:4005/events", {
            type:"CommentCreated",
            data:{
                id:commentId, 
                content,
                postId,
                status:"pending"
            }
        })
    } catch (error) {
        
    }

    
    

    res.status(201).send(comments);
})

app.post("/events", async (req, res) => {
    console.log("Event Received ", req.body.type);

    const {type, data} = req.body;


    if (type === "CommentModerated"){
        const {id, content, postId, status} = data;
        const comments = commentsByPostID[postId].comments;
        let comment = comments.find(comment => comment.id === id)
        comment.status = status;

        // await axios.post("http://localhost:4005/events", {
        await axios.post("http://event-bus-srv:4005/events", {
            type:"CommentUpdated",
            data:{
                id, 
                content, 
                postId, 
                status
            }
        })
    }

    res.send({})
})


app.listen(port, () => {
    console.log(`comments listening in port : ${port}`)
})