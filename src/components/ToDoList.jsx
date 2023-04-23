import { ToDoItem } from "./ToDoItem";
import { useEffect, useContext } from "react";
import { TodoContext, ACTIONS } from "../context/TodoContext";
import api from '../api/axios';


export function ToDoList() {

    const [state, dispatch] = useContext(TodoContext);

    useEffect(() => {

        async function todos() {
            try {
                const response = await api.get('/toDos');
                dispatch({ type: ACTIONS.FETCH, payload: response.data });

            } catch (error) {
                console.log(error);
            }
        }

        todos();

    }, []);

    async function toggleTodo(_id) {
        try {
            const todo = state.find(obj => obj._id === _id);
            await api.patch('/toDos/' + _id, { ...todo, completed: todo.completed ? 0 : 1 });
            dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { _id } });

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteToDo(_id) {
        try {
            await api.delete('/toDos/' + _id);
            dispatch({ type: ACTIONS.DELETE_TODO, payload: { _id } });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ul className="list">
            {state.length === 0 && "הרשימה ריקה"}
            {state.map(todo => {
                return (
                    <ToDoItem {...todo} key={todo._id} toggleTodo={toggleTodo} deleteToDo={deleteToDo} />
                )
            })}

        </ul>
    )
}