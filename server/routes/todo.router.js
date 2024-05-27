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
router.post('/', function (request, response) {
    console.log('request.body', request.body);

    let newToDo = request.body;

    let toDo = newToDo.todo;
    let complete = newToDo.complete;
   
    let queryText = `INSERT INTO "todolist" ("toDo", "complete")
    VALUES ($1, $2);`
    pool.query(queryText, [toDo, complete])
        .then(dbResult => {
            console.log('dbResult.rows', dbResult.rows);
            response.sendStatus(201);
        })
        .catch(dbError => {
            console.log('dbError:', dbError);
            response.sendStatus(500);

            console.log('Adding treats', newTreat);
        })
});

// PUT

// DELETE

module.exports = router;
