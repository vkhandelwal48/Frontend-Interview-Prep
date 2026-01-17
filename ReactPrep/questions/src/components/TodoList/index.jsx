import { useState } from "react"

let id = 0;
const TODOS = [
    { id: id++, title: "Learn React" },
    { id: id++, title: "Learn Redux" },
    { id: id++, title: "Build something fun!" },
];

const TodoList = () => {
  const [tasks, setTasks] = useState(TODOS);
  const [newItem, setNewItem] = useState("");
  return (
    <div>
      <h1>Todo List</h1>
      <input onChange={(e) => setNewItem(e.target.value)}/>
      <button onClick={() => setTasks([...tasks, { id: id++, title: newItem }])}>Add Item</button>
      <div>
        {tasks.map(item => (
          <li key={item.id}>
            <span>{item.title}</span>
            <button onClick = {() => setTasks(tasks.filter(i => i.id !== item.id))}>Delete</button>
          </li>
        ))}
      </div>
    </div>
  )
}

export default TodoList;
