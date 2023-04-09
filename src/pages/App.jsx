import { useEffect, useState } from 'react'
import '/styles.css'
import { ToDoForm } from '../components/ToDoForm';
import { ToDoList } from '../components/ToDoList';
import api from '../api/axios';


export default function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todos = async () => {
      try {
        const response = await api.get('/toDos');
        console.log("toDos: ",response.data);
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    todos();
  }, []);

  async function addToDo(title) {

    try {
      const response = await api.post('/toDos', { title: title, completed: 0 });
      console.log(response.data);

      setTodos(currentTodos => {
        return [...currentTodos, response.data];
      });

    } catch (error) {
      console.log(error);
    }


  }

  async function toggleTodo(_id) {

    const todo = todos.find(doto => doto._id === _id);
    todo.completed = todo.completed? 0: 1;

    try {
      const response = await api.patch('/toDos/' + _id, todo);

      setTodos(currentTodos => {

        let todos = currentTodos.map(todo => {
          if (todo._id === _id) {
            return response.data;
          }

          return todo;
        });
        
        todos = todos.sort( (todo1,todo2)=> todo1.completed - todo2.completed);
        console.log("after sort: ",todos);
        return todos;
      });

    } catch (error) {
      console.log(error);
    }

  }

  async function deleteToDo(_id) {

    try {
      await api.delete('/toDos/' + _id);
    } catch (error) {
      console.log(error);
    }

    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo._id !== _id);
    });
  }

  return (
    <>
      <div className="container">
        <ToDoForm onSubmit={addToDo} />
        <ToDoList todos={todos} toggleTodo={toggleTodo} deleteToDo={deleteToDo} />
      </div>

    </>
  )
}
