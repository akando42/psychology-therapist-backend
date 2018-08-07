import { API } from "./api";

const http = require('http');

process.env.SECRET_KEY = "this is my secretkey";

const api: API = new API();

http.createServer(api.express).listen(3030, () => {
    console.log(`up and running on port ${3030}`)
})


// setInterval(function () {
//     var used = process.memoryUsage().heapUsed / 1024 / 1024;
//     console.log(`Script : ${Math.round(used * 100) / 100} MB `);
// }, 1000);


