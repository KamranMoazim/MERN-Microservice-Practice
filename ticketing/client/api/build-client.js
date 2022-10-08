import axios from "axios";


export default ({req}) => {


  if (typeof window === "undefined") {
    
    // ! http://ServiceName.Namespace.svc.cluster.local
    // ! http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
      
    // console.log(req.headers)
    // * we are on SERVER
    return axios.create({
        baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
        headers: req.headers
    });

  } else {
    // * we are on BROWSER
    return axios.create({
        baseURL: "/"
    });
  }

}