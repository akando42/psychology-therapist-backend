//better hanle env variables
process.env.SECRET_KEY = "this is my secretkey";
process.env.MAILGUN_API_KEY = '759a41ec453b708bcb16e0769be3e864-b892f62e-d75c1e60';
process.env.MAILGUN_USERNAME = 'therapyondemand.xyz';
process.env.INVITATION_SECRET = 'testtset';
//helper for unhandler promises temporal
process.on('uncaughtException', function (err) {
    console.log(err);
});

const port: any = process.env.PORT || '3000';
import { API } from "./api";
const http = require('http');

const api: API = new API();


http.createServer(api.express).listen(port, () => {
    console.log(`up and running on under ${port}`)

});

