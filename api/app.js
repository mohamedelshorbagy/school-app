const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const CONFIG = require('./config');


const app = express();



/**
 * 
 * MiddleWares
 * 
 */
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * 
 * DB CONNECTION
 * 
 */
db.connect((err) => {
    if (err) throw err;
    console.log('Database Connected Successfully!');
});


/**
 * 
 * ROUTES
 * 
 */

const parentRoute = require('./routes/parents');


app.use('/api/parents', parentRoute);

/**
 * 
 * App Listen PORT
 */

app.listen(CONFIG.port, () => {
    console.log(`App is Listenning in Port ${CONFIG.port}`);
})
