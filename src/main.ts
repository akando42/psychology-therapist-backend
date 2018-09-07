//better hanle env variables
process.env.SECRET_KEY = "this is my secretkey";
process.env.MAILGUN_API_KEY = '759a41ec453b708bcb16e0769be3e864-b892f62e-d75c1e60';
process.env.MAILGUN_USERNAME = 'therapyondemand.xyz';
const port: any = process.env.PORT || '3000';

import * as os from 'os';
// import { authModule } from './modules/authentication';
import { API } from "./api";
import { MySqlLocationsRepository } from './modules/users/dao/repositories/my-sql-locations.repository';
import { GenericDao } from './behavior/mysql/generic.dao';
import { MySqlLocationsConverter } from './modules/users/converters/my-sql/my-sql-locations.converter';

// const http = require('http');

// const api: API = new API();

// http.createServer(api.express).listen(port, () => {
//     console.log(`up and running on under ${port}`)
// });


// setInterval(function () {
//     var used = process.memoryUsage().heapUsed / 1024 / 1024;
//     console.log(`Script : ${Math.round(used * 100) / 100} MB `);
// }, 1000);


// authModule.init();

// console.log(authModule.authenticate({ email: 'info@therapyondemand', password: 'testest' }))

const repo =
    new MySqlLocationsRepository(GenericDao, MySqlLocationsConverter)