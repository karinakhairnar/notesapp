import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

import TasksList from './Components/TasksList';
import { createGlobalState } from 'react-hooks-global-state';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import {IoMdAddCircle} from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';


export const { useGlobalState } = createGlobalState({data: null});

export const checkTasks = () => {
  if(localStorage.getItem("storageTasks") === null)
    localStorage.setItem("storageTasks", "[]");
}

export const getTasks = () => {
  checkTasks();
  return JSON.parse(localStorage.getItem("storageTasks"));
}

export const updateTasks = (tasks) => {
  localStorage.setItem("storageTasks", JSON.stringify(tasks));
}

export const completeTask = (currentId, bool) => {
  const tasks = getTasks();
  tasks[currentId].iscompleted = bool;
  
  updateTasks(tasks);
}

export const getStorageToken = () => {
  if(localStorage.getItem("storageToken") === null)
    localStorage.setItem("storageToken", uuidv4());

  return localStorage.getItem("storageToken");
}

export const removeTask = (currentId) => {
  const tasks = getTasks();
  const newTasks = tasks.filter((task) => {
    return task.id !== currentId;
  });

  updateTasks(newTasks);
}


function App() {
  const [name, setName] = useState('');
  const [data, setData] = useGlobalState('data');
  const [body, setBody] = useState('');
  const [date,setDate]= useState('');
  useEffect(() => {
    setData(getTasks());
  }, [])


  const addNotes = (name, body,date,  iscompleted, token) => {
    checkTasks();
    const id = getTasks().length === 0 ? 0 : getTasks()[getTasks().length - 1].id + 1;
    const object = {id, name, body, date, iscompleted, token};
    const tasks = getTasks();
    tasks.push(object);
    updateTasks(tasks);
  }

  const submitTask = () =>{
   

    if(name === '' || body === ''){
      toast.error('Fill the blank fields');
    }else{
      addNotes(name, body, date, false, getStorageToken());
      setData(getTasks());
      
      setName('');
      setBody('');
    }
  }


  return (
    <div className="App">

      <div className="add-task">
        <h1><BsFillCalendarPlusFill></BsFillCalendarPlusFill> Notes:</h1>
        <ul className="task-options">
          <li>
            <label>Title :</label>
            <input type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}></input>
          </li>

          <li>
            <label>Description :</label>
            <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}></textarea>
          </li>
          <input type='date'value={date}
            onChange={(e) => setDate(e.target.value)} style={{margin:'10px',padding:'5px',width:'30%'}}/>
          <Toaster />
          <button onClick={submitTask} style={{backgroundColor:'rgb(124, 7, 7)'}}><IoMdAddCircle></IoMdAddCircle> Add Notes</button>
        </ul>
      </div>
       {data && <TasksList data={data}></TasksList>}
    </div>
  );
}

export default App;
