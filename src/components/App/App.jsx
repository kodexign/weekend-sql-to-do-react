import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [task, setTask] = useState('');
  let [complete, setComplete] = useState('');
  let [taskArray, setTaskArray] = useState([]);// do I need this??

let fetchTask = () => {
      console.log('fetchTask:', fetchTask);
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
  useEffect(fetchTask, [setTaskArray]);

  let addTask = (event) => {
    event.preventDefault();
    
    axios({
        method: 'POST',
        url: '/api/todo',
        data: {
            task: task,
            complete: complete,
        }
    })
        .then((response) => {
            console.log('successful POST:', response);
            fetchTask();
            //clears input
            setTask('');
            setComplete('');
        })
        .catch((error) => {
            console.log('POST failed:', error);
        })
    }

    let deleteTask = (id) => {
      axios.delete(`/api/todo/${id}`)
      .then((response) => {
          console.log('deleting item worked:', response);
          fetchList();
      })
      .catch(function (error) {
          console.log(error);
      })
    }

    return (
      <div className="App">
          <h1>TO DO:</h1> 
          <form onSubmit={addTask}>
          <label htmlFor="item">Task</label>
              <input id="item" onChange={(event) => setTask(event.target.value)} value={task} />
              {/* <label htmlFor="quantity">Quantity</label>
              <input id="quantity" onChange={(event) => setComplete(event.target.value)} value={complete} />  */}
              <button type="submit">Add new task</button>
          </form>
          <h2>Task List</h2>
          {taskArray.map((item) => { return (<li key={todo.task}>{todo.task} {todo.complete} <button onClick={() => deleteTask(item.id)}>Remove</button> <button onClick={() => toggleItem(item.id)}>not functioning Complete</button> </li>); })}
      </div>
  );
}



export default App;
