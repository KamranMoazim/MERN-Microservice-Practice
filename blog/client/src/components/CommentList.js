import React from 'react'



export default function CommentList({comments}) {


    const renderComments = () => Object.values(comments).map(comment => {
      let content;
      if(comment.status === "approved"){
        content = comment.content;
      }
      if(comment.status === "rejected"){
        content = "This comment has been rejected";
      }
      if(comment.status === "pending"){
        content = "This comment is awaiting for moderation";
      }
      
      return <li key={comment.id}> {content} </li>
    })

    
  return (<ul> {renderComments()} </ul>)
}
