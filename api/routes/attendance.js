const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/createTable', (req, res, next) => {
    let sql = `
    CREATE TABLE attendance (
        id int(11) AUTO_INCREMENT,
        childId int(11),
        checked int(1),
        time VARCHAR(255),
        line VARCHAR(255),
        confirmed int(1),
        PRIMARY KEY (id)
    )`;

    // Update Table COLUMNS ==> ALTER TABLE (parents) ADD COLUMN (age) INT(11)
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            message: 'Table Created!'
        });
    })
})


router.post('/create', (req, res, next) => {
    let children = req.body.children;
    // [childId,checked,line,confirmed,time]
    let sql = `
        INSERT INTO attendance(childId,checked,line,confirmed,time) SET ?
    `;
    db.query(sql, [children], (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] === 1) {
            res.status(200).json({
                success: true,
                message: 'Attendance Added Successfully!'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Something Went Wrong!'
            });
        }
    })
})


router.get('/getAttendance/:lineNumber/:day', (req, res, next) => {
    let sql = `SELECT * FROM attendance WHERE line=${req.params.lineNumber} and time=${req.params.day}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length >= 1) {
            res.status(200).json({
                success: true,
                count: result.length,
                children: result
            })
        } else {
            res.status(200).json({
                success: false,
                count: 'There\'s no parents right now!',
            })
        }
    })
})

router.get('/:id', (req, res, next) => {
    let id = req.params.id;

    let sql = `
        SELECT * FROM parents WHERE id=${id} LIMIT 1
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length >= 1) {
            res.status(200).json({
                success: true,
                parent: result[0]
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'User Not Found'
            })
        }
    })
})


router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    let parent = req.body;
    let sql = `
        UPDATE parents SET ? WHERE id=${id}
    `;
    db.query(sql, parent, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] === 1) {
            res.status(200).json({
                success: true,
                message: 'Your Data Updated Successfully!'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Something Went Wrong'
            })
        }

    })


})


router.delete('/:id', (req, res, next) => {
    let id = req.params.id;

    let sql = `
        DELETE FROM parents WHERE id=${id}
        `;

    db.query(sql, (err, result) => {
        if (err) throw err;

        if (result['affectedRows'] === 1) {
            res.status(200).json({
                success: true,
                message: 'User Deleted Successfully!'
            })
        } else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!'
            })
        }
    })
})















module.exports = router;