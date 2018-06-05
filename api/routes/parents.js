const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/createTable', (req, res, next) => {
    let sql = `
    CREATE TABLE parents (
        id int(11) AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        code int(6) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(11) NOT NULL,
        lat FLOAT(10,6) NOT NULL,
        lng FLOAT(10,6) NOT NULL,
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
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        code: req.body.code
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

router.get('/:code', (req, res, next) => {
    let code = req.params.code;

    let sql = `
        SELECT * FROM parents WHERE code=${code} LIMIT 1
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length >= 1) {
            res.status(200).json({
                success: true,
                isParent: true,
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

router.get('/:id/children', (req, res, next) => {
    let id = req.params.id;

    let sql = `
        SELECT * FROM child WHERE parentId=${id}
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
