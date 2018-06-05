const express = require('express');
const router = express.Router();
const db = require('../db');


/**
 * 
 * INNER JOIN QUERY
 * https://dba.stackexchange.com/questions/151904/mapping-many-to-many-relationship?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
 * 
 */


router.get('/child', (req, res, next) => {
    let sql = `
    ALTER TABLE child
    ADD CONSTRAINT col_child_class_id
        FOREIGN KEY (classId) REFERENCES class(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    ADD CONSTRAINT col_child_parent_id
        FOREIGN KEY (parentId) REFERENCES parents(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            message: 'Table Created!'
        });
    })
})


router.get('/driver', (req, res, next) => {
    let sql = `
    ALTER TABLE driver
    ADD CONSTRAINT col_driver_bus_id
    FOREIGN KEY (busId) REFERENCES bus(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    `;

    // Update Table COLUMNS ==> ALTER TABLE (parents) ADD COLUMN (age) INT(11)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            message: 'Table Created!'
        });
    })
})

router.get('/matrons', (req, res, next) => {
    let sql = `
    ALTER TABLE matrons
    ADD CONSTRAINT col_matron_bus_id    
    FOREIGN KEY (busId) REFERENCES bus(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    `;

    // Update Table COLUMNS ==> ALTER TABLE (parents) ADD COLUMN (age) INT(11)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            message: 'Table Created!'
        });
    })
})


router.get('/attendance', (req, res, next) => {
    let sql = `
    ALTER TABLE attendance
    ADD CONSTRAINT col_attendance_child_id
    FOREIGN KEY (childId) REFERENCES child(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    `;

    // Update Table COLUMNS ==> ALTER TABLE (parents) ADD COLUMN (age) INT(11)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            message: 'Table Created!'
        });
    })
})

router.get('/daily', (req, res, next) => {
    let sql = `
    ALTER TABLE daily
    ADD CONSTRAINT col_daily_child_id
        FOREIGN KEY (childId) REFERENCES child(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    ADD CONSTRAINT col_daily_matrons_id
        FOREIGN KEY (matronId) REFERENCES matrons(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    ADD CONSTRAINT col_daily_driver_id
        FOREIGN KEY (driverId) REFERENCES driver(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    `;

    // Update Table COLUMNS ==> ALTER TABLE (parents) ADD COLUMN (age) INT(11)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            message: 'Table Created!'
        });
    })
})



module.exports = router;
