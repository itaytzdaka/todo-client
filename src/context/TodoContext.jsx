import { createContext, useReducer } from 'react';

export const TodoContext = createContext();

export const ACTIONS = {
    FETCH: "fetch",
    ADD_TODO: "add-todo",
    TOGGLE_TODO: "toggle-todo",
    DELETE_TODO: "delete-todo"
}

function reducer(state, action) {
    switch (action.type) {
  
      case ACTIONS.FETCH:
        return action.payload;
  
      case ACTIONS.ADD_TODO:
        return [...state, action.payload];
  
      case ACTIONS.TOGGLE_TODO:
        return state.map(todo => todo._id === action.payload._id ? { ...todo, completed: !todo.completed } : todo);
  
      case ACTIONS.DELETE_TODO:
        return state.filter(todo => todo._id === action.payload._id ? false : true);
  
      default:
        return state;
    }
  }

export const TodoProvider= props => {

    const [state, dispatch] = useReducer(reducer, []);

    return (
        <TodoContext.Provider value={[state, dispatch]}>
            {props.children}
        </TodoContext.Provider>
    )
}