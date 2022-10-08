import React from 'react'
import axios from "axios";
import buildClient from '../api/build-client';


const LandingPage = ({currentUser}) => {
  // console.log(currentUser)

  return <h1>{currentUser ? "You are signed in" : "You are NOT signed in" }</h1>;
}

// ? ----------------
// LandingPage.getInitialProps = async ({req}) => {
//   if (typeof window === "undefined") {
//     // * we are on SERVER
//     // ! https://ServiceName.Namespace.svc.cluster.local
//     // ! https://ingress-nginx-controller.ingress-nginx.svc.cluster.local
//     const {data} = await axios.get("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", {
//       headers: req.headers,
//     })
//     return data;
//   } else {
//     // * we are on BROWSER
//     const {data} = await axios.get("/api/users/currentuser")
//     return data;
//   }
// }
// ? ----------------




LandingPage.getInitialProps = async (context) => {
  const client = await buildClient(context);
  const {data} = await client.get("/api/users/currentuser");
  return data;  
}


export default LandingPage;