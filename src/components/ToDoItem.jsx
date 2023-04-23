
export function ToDoItem({ completed, _id, title, toggleTodo, deleteToDo}) {

    return (
        <li key={_id}>
            <label>
                <input type="checkbox" checked={completed} onChange={() => { toggleTodo(_id) }} />
                <span>{title}</span>
            </label>
            <button className="btn btn-danger" onClick={() => { deleteToDo(_id) } }>מחק</button>
        </li>
    )
}