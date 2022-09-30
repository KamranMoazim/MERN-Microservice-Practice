import React, { useState } from 'react'
import axios from "axios"




export default function CommentCreate({postId}) {

    const [content, setContent] = useState("")

    const submit = async (e) => {
        e.preventDefault();

        const res = await axios.post(`http://localhost:4001/posts/${postId}/comments`, {content})
        // console.log(res)
        alert();
        setContent("")
    }

  return (
    <div>
        <form onSubmit={submit}>
            <div className='form-group'>
                <label> New Comment </label>
                <input className='form-control' onChange={(e) => setContent(e.target.value)} value={content} />
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}
