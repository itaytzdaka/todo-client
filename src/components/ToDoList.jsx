import { ToDoItem } from "./ToDoItem"

export function ToDoList({todos, toggleTodo, deleteToDo}) {
    return (
        <ul className="list">
            {todos.length === 0 && "הרשימה ריקה"}
            {todos.map(todo => {
                return (
                    <ToDoItem {...todo} key={todo._id} toggleTodo={toggleTodo} deleteToDo={deleteToDo}/>
                )
            })}

        </ul>
    )
}