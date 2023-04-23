import '/styles.css'
import { ToDoForm } from '../components/ToDoForm';
import { ToDoList } from '../components/ToDoList';
import { TodoProvider } from '../context/TodoContext';

export default function App() {

  return (

    <div className="container">
      <TodoProvider>
        <ToDoForm/>
        <ToDoList/>
      </TodoProvider>
    </div>
  )
}
