import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

function toDoList() {
    let [task, setTask] = useState('');
    let [complete, setComplete] = useState('');
    let [taskArray, setTaskArray] = useState([]);

    const fetchTask = () => {
        console.log('fetchTask:', fetchTask);
        Axios({
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

// return (
//     <div className="App">
//         <header className="Header-main">
//             <h1>TO DO LIST</h1>
//         </header>
//         <section className="new-person-section">
//             <form onSubmit={addPerson}>
//                 <label htmlFor="name-input">Name:</label>
//                 <input id="name-input" onChange={e => setPersonName(e.target.value)} />
//                 <label htmlFor="role-input">Famous for:</label>
//                 <input id="role-input" onChange={e => setPersonRole(e.target.value)} />
//                 <button type="submit">Done</button>
//             </form>
//             <p>
//                 {famousPersonName} is famous for "{famousPersonRole}".
//             </p>
//             <ul>
//                 {/* TODO: Render the list of famous people */}
//                 {/* {JSON.stringify(famousPeopleArray)} */}
//                 {famousPeopleArray.map((people) => { return (<li key={people.name}>{people.name} is famous for {people.role} <button onClick={() => deletePeople(people.id)}>Delete</button> <button onClick={() => togglePeople(people.id)}>Like</button> </li>); })}
//             </ul>
//         </section>
//     </div>
// );
}

export default App;