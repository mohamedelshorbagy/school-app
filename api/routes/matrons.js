const express = require('express');
const router = express.Router();
const db = require('../db');



router.get('/createTable', (req, res, next) => {
    let sql = `
    CREATE TABLE matrons (
        id int(11) AUTO_INCREMENT,
        name VARCHAR(255),
        password VARCHAR(255),
        code int(7),
        phone VARCHAR(11),
        line VARCHAR(255),
        busId int(11),
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
    let parent = {
        name: req.body.name,
        code: req.body.code,
        password: req.body.password,
        phone: req.body.phone,
        line: req.body.line,
        busId: req.body.busId
    }
    let sql = `
        INSERT INTO parents SET ?
    `;
    db.query(sql, parent, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] === 1) {
            res.status(200).json({
                success: true,
                message: 'User Created Successfull!'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Something Went Wrong!'
            });
        }
    })
})


router.get('/all', (req, res, next) => {
    let sql = 'SELECT * FROM parents';

    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length >= 1) {
            res.status(200).json({
                success: true,
                count: result.length,
                parents: result
            })
        } else {
            res.status(200).json({
                success: false,
                count: 'There\'s no parents right now!',
            })
        }
    })
})


router.get('/getChildren/:lineNumber', (req, res, next) => {
    let lineNumber = req.params.lineNumber;

    let sql = `
        SELECT * FROM child WHERE line=${lineNumber}
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length >= 1) {
            res.status(200).json({
                success: true,
                children: result
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'No Children In this Line'
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