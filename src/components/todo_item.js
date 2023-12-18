import React, {useState} from 'react';
function ToDoItem(props) {
    const [showInput, setShowInput] = useState(false);
    const [editToDo, setEditToDo] = useState("");

    const saveMe = () =>{
        setShowInput(!showInput)
        if(showInput) {
           props.saveToDoHndlr([props.idItem,editToDo])
        }

    }



    return (
        <div className="todo">
            <input className="inp-cbx" id={"cbx-"+props.idItem}  type="checkbox" defaultChecked={props.isChecked} onChange={(e)=>props.checkToDoHndlr([props.idItem,e.target.checked])}/>
            <label className="cbx" htmlFor={"cbx-"+props.idItem}>
            <span>

                <svg width="12px" height="9px" viewBox="0 0 12 9">
                    <polyline points="1 5 4 8 11 1"></polyline>
                </svg>
            </span>
                <span>
                {showInput ?(<input title="" className="edit-todo-input" defaultValue={props.title} onChange={(e)=>{setEditToDo(e.target.value)}} />):
                    (<li  className={(props.isChecked ? "checked" : "")}>{props.title}</li>)
                }
            </span>
            </label>

            <button className="edit-button" onClick={saveMe}>{showInput?("Save"):("Edit")}

            </button>
            <button className="delete-button" onClick={()=>props.delToDoHndlr(props.idItem)}>Delete</button>
        </div>

    )
}
export default ToDoItem