import axios from "axios";


let api =  axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
});

api.AuthorizationHeader = (token) => {
  if(token){
    api.defaults.headers["Authorization"] =  `Bearer ${token}`
  }
}

api.clearToken = () => {
  delete api.defaults.headers["Authorization"]
}


// api.AuthorizationHeader = (token) => {
//   if(token){
//     api.interceptors.request.use( async (config) => {
//         config.headers.Authorization = `Bearer ${token}`
//         return config
//     }, function(error) {
//         return Promise.reject(error);
//     });
//   }
// }

// api.clearToken = () => {
//   api.interceptors.request.use( async (config) => {
//       config.headers.Authorization = ''
//       return config
//   }, function(error) {
//       return Promise.reject(error);
//   });
// }


  
module.exports = api;
  