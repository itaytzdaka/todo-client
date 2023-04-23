import { useEffect, useState, useReducer } from 'react'
import '/styles.css'
import { ToDoForm } from '../components/ToDoForm';
import { ToDoList } from '../components/ToDoList';
import api from '../api/axios';

const ACTIONS = {
  FETCH: "fetch",
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo"
}

function reducer(state, action){
  switch (action.type) {

    case ACTIONS.FETCH:
      return action.payload;

    case ACTIONS.ADD_TODO:
      return [...state, action.payload];

    case ACTIONS.TOGGLE_TODO:
      return state.map(todo=> todo._id === action.payload._id? {...todo, completed: !todo.completed} : todo);

    case ACTIONS.DELETE_TODO:
      return state.filter(todo=> todo._id === action.payload._id? false : true);
  
    default:
      return state;
  }
}

export default function App() {

  const [state, dispatch] = useReducer(reducer, []);


  useEffect(() => {

     async function todos() {
      try {
        const response = await api.get('/toDos');
        dispatch({type: ACTIONS.FETCH, payload: response.data});

      } catch (error) {
        console.log(error);
      }
    }

    todos();
  }, []);

  async function addToDo(title) {

    try {
      const response = await api.post('/toDos', { title: title, completed: 0 });
      dispatch({type: ACTIONS.ADD_TODO, payload: response.data});

    } catch (error) {
      console.log(error);
    }
    
  }

  async function toggleTodo(_id) {

    try {

      const todo = state.find(obj=>obj._id===_id);
      await api.patch('/toDos/' + _id, {...todo, completed: todo.completed? 0: 1});
      dispatch({type: ACTIONS.TOGGLE_TODO, payload: { _id }});

    } catch (error) {
      console.log(error);
    }

  }

  async function deleteToDo(_id) {

    try {
      await api.delete('/toDos/' + _id);
      dispatch({type: ACTIONS.DELETE_TODO, payload: { _id }});

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <ToDoForm onSubmit={addToDo} />
        <ToDoList todos={state} toggleTodo={toggleTodo} deleteToDo={deleteToDo} />
      </div>

    </>
  )
}
