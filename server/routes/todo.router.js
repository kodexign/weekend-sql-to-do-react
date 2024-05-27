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
router.put('/:id', function (request, response) {
    console.log('description updated');
    let idToUpdate = request.params.id;
    console.log('idToUpdate:', idToUpdate);
    console.log('typeof idToUpdate:', typeof idToUpdate);

    let toDo = request.body.todo;
    console.log('description:', todo);

    let queryText = `UPDATE "todolist" SET "todo" = $1 WHERE id = $2`;
    pool.query(queryText, [toDo, idToUpdate])
        .then(dbResult => {
            console.log('todo updated:',dbResult);
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
    let queryText = `DELETE FROM "todolist" WHERE id = $1;`;

    pool.query(queryText, [idToDelete])
    .then(dbResult => {
        console.log(dbResult);
        response.sendStatus(200);
    })
    .catch(dbError => {
        console.log('dbError', dbError);
        response.sendStatus(500);

        console.log('deleted treat:', idToDelete);
    })
});

module.exports = router;
