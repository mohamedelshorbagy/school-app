const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/createTable', (req, res, next) => {
    let sql = `
    CREATE TABLE daily (
        id int(11) AUTO_INCREMENT,
        childId int(11) NOT NULL,
        matronId int(11) NOT NULL,
        driverId int(11) NOT NULL,
        arrived VARCHAR(255) NOT NULL,
        dropped VARCHAR(255) NOT NULL,
        day VARCHAR(255) NOT NULL,
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
        phone: req.body.phone
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


router.get('/getDailyTable/:childId/:day', (req, res, next) => {
    let sql = `
    SELECT child.name AS child , driver.name AS driver , matrons.name AS matrons, arrived , dropped , day , attendance.checked AS checked 
    From daily 
    INNER JOIN child 
        ON daily.childId = child.id 
    INNER JOIN driver 
        ON daily.driverId = driver.id 
    INNER JOIN matrons 
        ON daily.matronId = matrons.id 
    INNER JOIN attendance 
        ON daily.childId = attendance.childId 
    WHERE 
        daily.childId = ${req.params.childId} 
    AND 
        daily.day Like '%${req.params.day}%' 
    AND 
        attendance.time Like '%${req.params.day}%'
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length >= 1) {
            res.status(200).json({
                success: true,
                count: result.length,
                daily: result
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
