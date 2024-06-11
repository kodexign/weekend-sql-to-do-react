const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', function (request, response) {

    let queryText = `SELECT * FROM "todo";`;

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

// PUT ROUTE FOR TOGGLE -- COMPLETE/NOT COMPLETE/// not function correctly
router.put('/toggle/:id', function (request, response) {
    console.log('task updated');
    let { id } = request.params;
    console.log('idToUpdate:', id);
    console.log('typeof idToUpdate:', typeof id);

    let queryText = `UPDATE "todo" SET "complete" = NOT "complete" WHERE id = $1`;
    pool.query(queryText, [id])
        .then(dbResult => {
            console.log('task updated:', dbResult);
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

//UNDO
router.put('/undoTask/:id', function (request, response) {

    let { id } = request.params;
    console.log('undoTask:', id);
    let queryText = `
        UPDATE "todo" SET "complete" = NOT "complete" WHERE id =$1;
    `;
    pool.query(queryText, [id])
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            response.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error undoing status ${queryText}`, error);
            response.sendStatus(500); // Good server always responds
        })
});



module.exports = router;
