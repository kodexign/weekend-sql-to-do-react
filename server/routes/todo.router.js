const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', function (request, response) {

    let queryText = 'SELECT * FROM "todolist";';

    pool.query(queryText)
        .then((dbResult) => {
            let toDoList = dbResult.rows;
            console.log('get dbResult:', dbResult);
            response.send(toDoList);
        })
        .catch((dbError) => {
            console.log('dbError:', dbError);
            response.sendStatus(500);
        })

});

// POST

// PUT

// DELETE

module.exports = router;
