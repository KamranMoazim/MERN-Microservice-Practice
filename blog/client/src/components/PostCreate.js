import React, { useState } from 'react'
import axios from "axios"


export default function PostCreate() {

    const [title, setTitle] = useState("")

    const submit = async (e) => {
        e.preventDefault();

        // const res = await axios.post("http://localhost:4000/posts", {title})
        const res = await axios.post("http://posts.com/posts/create", {title})
        // console.log(res)
        alert();
        setTitle("")
    }

  return (
    <div>
        <form onSubmit={submit}>
            <div className='form-group'>
                <label> Title </label>
                <input className='form-control' onChange={(e) => setTitle(e.target.value)} value={title} />
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}
