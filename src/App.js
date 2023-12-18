import React, {useEffect, useState} from 'react';
//import logo from './logo.svg';
import './App.css';
import ToDoItem from './components/todo_item.js'
import axios from "axios";

function App() {
    let [todos, setTodos] = useState([]);

    const [todo, setTodo] = useState("");

    const get_todos = ()=>{
        axios({
            url: 'http://localhost:5000/todos',
            method: 'get'
        },)
            .then(response => {
                console.log(response)
                setTodos(response.data)
            })
    }
    useEffect(()=>{
        get_todos()
    },[])



const delFunction= param=>{
   axios({
        url: 'http://localhost:5000/todos/'+param,
        method: 'delete'
    },)
       .then(get_todos)
    console.log("do smthng:", 'http://localhost:5000/todos/'+param)
}

const AddNewToDo = param =>{
    if(todo!=="") {
        axios({
            url: 'http://localhost:5000/todos/',
            method: 'post',
            data: {
                "title": todo,
                "completed": false
            }
        },)
            .then(get_todos)
    }
}

    const save_todo= param=>{
        if(param[1] !=="") {
            axios({
                url: 'http://localhost:5000/todos/'+param[0],
                method: 'put',
                data: {
                    "title": param[1]
                }
            },)
                .then(get_todos)
        }
        console.log("do smthng:", param)
    }
    const check_todo= param=>{

            axios({
                url: 'http://localhost:5000/todos/'+param[0],
                method: 'put',
                data: {
                    "completed": param[1]
                }
            },)
                .then(get_todos)

        console.log("do smthng:", param)
    }

    console.log('Render main Component');
  return (
      <div className="App">
        <h1>ToDO APP</h1>
          <div className="input-wrapper">
              <input type="text" name="todo" placeholder="create new todo" value={todo} onChange={(e)=>{setTodo(e.target.value);}}/>
              <button className="add-button" onClick={AddNewToDo}>Add</button>
          </div>
          <ul>
          {
              //todos?.length>0?(

              todos.map((item, idx)=>(
                  <ToDoItem key={item.id} idItem={item.id} isChecked={item.completed} title={item.title} delToDoHndlr={delFunction} saveToDoHndlr={save_todo} checkToDoHndlr={check_todo}/>
              ))

              //):(<div className="empty"><p>Not found task</p></div> )
          }
          </ul>

      </div>

  );
}

export default App;
