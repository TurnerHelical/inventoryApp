const {Pool} = require('pg');
require('dotenv').config();

// set envKey to either the third argument in node app.js *argument* or defaults to localDBURL
const envKey = process.argv[2] || 'localDBUrl';
// uses the envKey variable and searches the env file for a matching value, then sets connectionString as equal to that value
const connectionString = process.env[envKey];

// uses the connectionString found in the env file to create a pool that can connect to the database
module.exports = new Pool({
    connectionString,
    // SSL only runs in production
    // it tells the pg module to connect to the databas with SSL encryption, not needed when hosted locally
    // this checks if the envKey is equal to localDBURL, if it is SSL is not required
    // if it doesnt' match the local url, it uses a SSL configuration object to tell node to use SSL, in this case with the option to not reject connection if the cert isn't verified
    ssl: envKey !== 'localDBUrl' ? {rejectUnauthorized: false} : false,
});