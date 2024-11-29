import {useEffect, useState} from 'react';
import {Task} from './components/task';
import task from './interfaces/task';

function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  useEffect(() => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);
  return (
    <>
      <div className="w-full h-screen grid place-content-center">
        <Task tasks={tasks} setTasks={setTasks} />
      </div>
    </>
  );
}

export default App;
