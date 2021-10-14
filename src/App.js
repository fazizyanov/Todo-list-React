import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import cancel from './cancel.svg';
import edit from './edit-list.svg';
import done from './check-mark.svg';


function App() {

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data)
    });
  });

  const addNewTask = async () => {
    await axios.post('http://localhost:8000/createTask', {
      text,
      isCheck: false,
    }).then(res => {
      setText('')
      setTasks(res.data.data)
    })
  }

  const deleteTask = async (value) => {
    await axios.delete(`http://localhost:8000/deleteTask?_id=${value}`).then(res => {
      setTasks(res.data.data)
    })
  }

  const updateTask = async () => {
    await axios.patch('http://localhost:8000/updateTask', {
      text: editedTask.text,
      _id: editedTask._id
    }).then(res => {
      console.log('res', res)
      setTasks(res.data.data);
      setEditedTask(null);
    })
  }

  const editTask = (task) => {
    setEditedTask(task)
    console.log('editedTask', editedTask)
    console.log('нажал на редактирование')
  }

  const updateIsCheck = async (task) => {
    await axios.patch('http://localhost:8000/updateTask', {
      isCheck: !task.isCheck,
      _id: task._id
    }).then(res => {
      console.log('res', res)
      setTasks(res.data.data)
    })
  }

  return (
    <div className="App">
      <header>
        <h1 className="header-heading">Todo-List</h1>
        <input className="header-input" type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="header-btn" onClick={() => addNewTask()}>Add new</button>
      </header>
      <div className="App-content">
        {
          tasks.map((task, index) => (
            editedTask && editedTask._id === task._id ? (
              <div className="App-tasks" key={`task-${index}`}>
                <input type="text" value={editedTask.text} onChange={(e) => setEditedTask({ _id: task._id, text: e.target.value, isCheck: task.isCheck })} />
                <button className="done" onClick={() => updateTask(task, task.text)}>
                  <img className="done" src={done} className="doneImg" alt="done" />
                </button>
              </div>
            ) : (
              <div className="App-tasks" key={`task-${index}`}>
                <input type="checkbox" checked={task.isCheck} onChange={() => updateIsCheck(task)} />
                <span>{task.text}</span>
                <button className="edit" onClick={() => editTask(task)}><img src={edit} className="editImg" alt="edit" /></button>
                <button className="delete" onClick={() => deleteTask(task._id)}><img src={cancel} className="deleteImg" alt="delete" /></button>
              </div>
            )
          ))
        }
      </div>
    </div>
  );
}

export default App;
