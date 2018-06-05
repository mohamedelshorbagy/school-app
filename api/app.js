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

const driverRoute = require('./routes/drivers');
const parentRoute = require('./routes/parents');
const matronsRoute = require('./routes/matrons');
const supervisorRoute = require('./routes/supervisors');
const childRoute = require('./routes/child');
const attendanceRoute = require('./routes/attendance');
const dailyRoute = require('./routes/daily-table');
const busRoute = require('./routes/bus');
const classRoute = require('./routes/class');
const schoolRoute = require('./routes/school');
const relations = require('./routes/relations');

app.use('/api/drivers', driverRoute);
app.use('/api/parents', parentRoute);
app.use('/api/matrons', matronsRoute);
app.use('/api/supervisors', supervisorRoute);
app.use('/api/child', childRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/daily-table', dailyRoute);
app.use('/api/bus', busRoute);
app.use('/api/class', classRoute);
app.use('/api/school', schoolRoute);
app.use('/api/relations', relations);

/**
 * 
 * App Listen PORT
 */

app.listen(CONFIG.port, () => {
    console.log(`App is Listenning in Port ${CONFIG.port}`);
})
