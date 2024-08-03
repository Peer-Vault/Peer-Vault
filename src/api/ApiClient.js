import axios from "axios";

export const ApiClient = axios.create({
    baseURL: "http://localhost:8072",
});

// axios.get('https://api.example.com/data')
//   .then(response => console.log(response))
//   .catch(error => console.error(error));