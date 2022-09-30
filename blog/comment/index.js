const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {randomBytes} = require("crypto")

const app = express();
app.use(bodyParser.json())
app.use(cors())


let port = 4001;

let commentsByPostID = {}

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostID[req.params.id] || []);
})

app.post("/posts/:id/comments", (req, res) => {

    const postId = req.params.id;
    const comments = commentsByPostID[postId] || [];


    const commentId = randomBytes(4).toString("hex")
    const {content} = req.body;
    comments.push({id:commentId, content})


    commentsByPostID[postId] = comments;

    res.status(201).send(comments);
})



app.listen(port, () => {
    console.log(`comments listening in port : ${port}`)
})