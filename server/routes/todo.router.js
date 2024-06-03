const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', function (request, response) {

    let queryText = 'SELECT * FROM "todo";';

    pool.query(queryText)
        .then((dbResult) => {
            let todo = dbResult.rows;
            console.log('get dbResult:', dbResult);
            response.send(todo);
        })
        .catch((dbError) => {
            console.log('error from GET router:', dbError);
            response.sendStatus(500);
        })

});

// POST
router.post('/', function (request, response) {
    console.log('request.body', request.body);

    let newTask = request.body;

    let task = newTask.task;
    let complete = newTask.complete;
   
    let queryText = `INSERT INTO "todo" ("task", "complete")
    VALUES ($1, $2);`
    pool.query(queryText, [task, complete])
        .then(dbResult => {
            console.log('POST router', dbResult.rows);
            response.sendStatus(201);
        })
        .catch(dbError => {
            console.log('Error from POST router:', dbError);
            response.sendStatus(500);

            console.log('Adding task', newTask);
        })
});

// PUT
router.put('/:id', function (request, response) {
    console.log('task updated');
    let idToUpdate = request.params.id;
    console.log('idToUpdate:', idToUpdate);
    console.log('typeof idToUpdate:', typeof idToUpdate);

    let task = request.body.task;
    console.log('description:', task);

    let queryText = `UPDATE "todo" SET "complete" = false WHERE id = $1`;
    pool.query(queryText, [task, idToUpdate])
        .then(dbResult => {
            console.log('task updated:',dbResult);
            response.sendStatus(200);
                })
        .catch(dbError => {
            console.log(dbError);
            response.sendStatus(500);
        })
});

// DELETE
router.delete('/:id', function (request, response) {
    console.log('req.params:', request.params);
    
    let idToDelete = request.params.id;
    console.log('idToDelete:', idToDelete);
    let queryText = `DELETE FROM "todo" WHERE id = $1;`;

    pool.query(queryText, [idToDelete])
    .then(dbResult => {
        console.log(dbResult);
        response.sendStatus(200);
    })
    .catch(dbError => {
        console.log('dbError', dbError);
        response.sendStatus(500);

        console.log('deleted task:', idToDelete);
    })
});

module.exports = router;
