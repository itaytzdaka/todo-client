import { useState } from "react";
import { useContext } from "react";
import { TodoContext, ACTIONS } from "../context/TodoContext";
import api from '../api/axios';

export function ToDoForm() {

    const [state, dispatch] = useContext(TodoContext);
    const [newItem, setNewItem] = useState("");

    async function addToDo(e) {

        try {
            e.preventDefault();
            if (newItem === "") return;

            const response = await api.post('/toDos', { title: newItem, completed: 0 });
            dispatch({ type: ACTIONS.ADD_TODO, payload: response.data });

            //clear input
            setNewItem("");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={addToDo} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">הוספת פריט:</label>
                <input value={newItem} onChange={e => { setNewItem(e.target.value) }} type="text" name="item" _id="item" />
            </div>
            <button className='btn'>הוסף</button>
        </form>
    )
}