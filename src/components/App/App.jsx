import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [task, setTask] = useState('');
  let [complete, setComplete] = useState('false');
  let [taskArray, setTaskArray] = useState([]);


  let fetchTask = () => {
    console.log('fetchTask');
    axios({
      method: 'GET',
      url: '/api/todo'
    }).then((response) => {
      console.log('GET response:', response);
      console.log('GET response data:', response.data);
      setTaskArray(response.data);
    }).catch((error) => {
      console.log("GET error", error);
    });
  }
  useEffect(fetchTask, []);

  let addTask = (event) => {
    event.preventDefault();
    console.log('task added:', task);

    axios({
      method: 'POST',
      url: '/api/todo',
      data: {
        // for later---inputs go here
        task: task,
        complete: complete
      }
    })
      .then((response) => {
        console.log('successful POST:', response);
        fetchTask();
        //clears input
        setTask('');
      })
      .catch((error) => {
        console.log('POST failed:', error);
      })
  }

  let deleteTask = (id) => {
    axios.delete(`/api/todo/${id}`)
      .then((response) => {
        console.log('deleting item:', response);
        fetchTask();
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  //functioning but the list gets re-ordered each time it toggles
  const toggleTask = (id) => {
    console.log('toggle action', id);

    axios.put(`/api/todo/toggle/${id}`)
      .then((response) => {
        console.log('toggle action worked:', response);
        fetchTask();
      })
      .catch(function (error) {
        console.log(error);
      })
  }
    //undo task complete
    let undoTask = (id) => {
      console.log('reset action', id);

      axios.put(`/api/todo/undoTask/${id}`)
        .then((response) => {
          console.log('reset action worked:', response);
          fetchTask();
        })
        .catch(function (error) {
          console.log(error);
        });
    
  }

  return (
    <div className="App">
      <h1>Stop Putting It Off:</h1>
      <div className="form">
        <form onSubmit={addTask}>
          <label htmlFor="task">New Task: </label>
          <input id="task" type="text" placeholder="input new task here" onChange={(event) => setTask(event.target.value)} value={task} />
          <button className="submit-button" type="submit" >Add new task</button>
        </form>
      </div>
      <div className="taskList">
        <h2>Task List</h2>
        {taskArray.map((todo) => {
          return (
            <li key={todo.task} className={todo.complete ? 'complete' : ''}>
              {todo.task} {todo.complete ? (
                <span> ✅
                  <button className='undo-button' onClick={() => undoTask(todo.id)}>undo</button>
                </span>
              ) : (
                <>
                  <button className="delete-button" onClick={() => deleteTask(todo.id)}>Remove</button>
                  <button className='complete-button' onClick={() => toggleTask(todo.id)}>Complete</button>
                 

                </>)}
            </li>);
        })}
      </div>

    </div>
  );
}



export default App;
