require('dotenv').config();

const { Client } = require('pg');


const SQL =
    // the CREATE TABLE line generates a table named appletree and the start of the parenthesis are where the column names go
    // the first column gives each apple an id and makes the id be automatically generated and unique, also sets it as the primary key
    // the second column will be name and sets the name of the apple it must be unique, NOT NULL means it's required, you can also use varchar instead of text but in postgres there is no difference in how the data is stored so only use varchar when you want to limit the characters in the string
    // the third column is optional and set a nickname of the apple if it has one, uses TEXT as string length is not important
    // fourth column is also optional and sets the orgin of the apple
    // fifth column is required and sets the number of apples of that type you have, the CHECK (quantity >= 0) ensures that negative numbers will not be stored for this value
    // sixth is optional and sets the month where the apple is ripest, set to SMALLiNT as the value is small and CHECK makes sure that its a number between 1 and 12
    // seventh is color, it's required and stored as text, the CHECK here is making sure that color is not an empty string, the <> stands for not equal 
    // last column is price, it's required and stored as NUMERIC, the params after it set the max number length to 10 and allows for 2 decimals, price is checked to ensure its more than 0

    // After the table data there are indexes created, indexes make searching the table quicker and should be set for any column that you plan on using for a lot of WHERE, ORDER BY, or JOINS
    // should only be used on columns that are used with those options regulary as it does take up storage space and makes writing to the db take longer
    // breaking structure down
    // CREATE INDEX creates the index 
    // idx_apples_best_month is the name of the index, you can name it whatever you would like but this pattern is most common, idx_*table*_*column*
    // ON apples indicates the table that will be indexed
    // (best_month) is the column that will be indexed, creating a sorted, searchable structure of all the best_month values in the apples table
    // indexes are used to make searching faster if the table has a lot of rows, without an index it has to check row by row to match the condition you set



    `
    CREATE TABLE IF NOT EXISTS appletree (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL UNIQUE,
        nickname TEXT,
        country_of_orgin TEXT,
        quantity INTEGER NOT NULL CHECK (quantity >= 0),
        best_month SMALLINT CHECK (best_month BETWEEN 1 AND 12),
        color TEXT NOT NULL CHECK (color <> ''),
        price NUMERIC(10,2) NOT NULL CHECK (price >= 0)
        );
        
    CREATE INDEX idx_appletree_best_month ON appletree (best_month);
    CREATE INDEX idx_appletree_country ON appletree (country_of_origin);
    CREATE INDEX idx_appletree_color ON appletree (color);
    CREATE INDEX idx_appletree_price ON appletree (price);
    `;

// process.argv is a built-in Node array that contains the arguements used in the command line script, the arguments in the script are split up into string by spaces in the code
// ie node db/populatedc.js remoteDBUrl wwould be ['/usr/bin/node', '/path/to/db/populatedb.js','remoteDBUrl'], and the number after argv is the position of the argument you want in the array
// so envKey creates the variable and sets it to the third argument in your script or defaults to 'localDBUrl'
// process.env is an object made up of all the props defined in your .env file, so the second line matches either the 3rd argument in your script or defaults to the backup you set
// if the argument doesn't exist in the variables defined in .env an error will not be thrown and the value will of connectionString will be undefined
// when connectionString is called, you app will crash as it won't have the correct value
// best practice is to write your own logic to throw an error if connectionString is undefined before it's called, it's makes debugging issues easier 

const envKey = process.argv[2] || 'localDBUrl';
const connectionString = process.env[envKey];

// this line checks and ensures that connectionString matches a value in the env file
if (!connectionString) throw new Error(`${envKey} not found in env file`);


// this function creates an new client object and gives it the data in the envKey found in the .env file
// connectionString should be this structure (connection protocol)://(username):(password)@(host):(port)/(database)
// (connection protocol) will usually be postgresql or postgres, this is then followed by :// to before the next section
// (username) is the username of the db admin 
// (password) is the password of the db admin
// (host) is the address of the machine the database is stored on, can be localhost if running command on database server or using local computer to run database, can be an IP address, or can be a domain name ie: db.leclairdev.com
// (port) is the port that postgres listens on, default is 5432
// (database) is the name of the database you are connecting to on the server 
async function main() {
    console.log('seeding.....');
    const client = new Client({
        connectionString,
    });
    // client.connect opens a network connection from the node app to the database server, uses the connectionString information to make that connection
    await client.connect();
    // client.query sends the defined SQL query to the database and waits for a response
    await client.query(SQL);
    // end the connection to the database server gracefully 
    await client.end();
    console.log('done');
};

main();

