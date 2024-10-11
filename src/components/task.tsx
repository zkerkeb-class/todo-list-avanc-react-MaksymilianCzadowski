import {useState, useMemo, useEffect, useCallback} from 'react';
import {Input} from './input';
import {Button} from './button';
import task from '../interfaces/task';
import {generateId} from '../utils/generateId';

export function Task({
  tasks,
  setTasks,
}: {
  tasks: task[];
  setTasks: (tasks: task[]) => void;
}) {
  const [myNewTask, setMyNewTask] = useState('');
  const [tab, setTab] = useState('all');
  const visibleTask = useMemo(
    () =>
      tasks.filter(task =>
        tab === 'all'
          ? true
          : tab === 'completed'
            ? task.completed
            : !task.completed,
      ),
    [tasks, tab],
  );

  const handleAddTask = useCallback(() => {
    setTasks([...tasks, {id: generateId(), name: myNewTask, completed: false}]);
    setMyNewTask('');
  }, [tasks, myNewTask]);

  const handleRemoveTask = useCallback(
    (id: number) => {
      setTasks(tasks.filter(task => task.id !== id));
    },
    [tasks],
  );

  const handleToggleTask = useCallback(
    (id: number) => {
      setTasks(
        tasks.map(task =>
          task.id === id ? {...task, completed: !task.completed} : task,
        ),
      );
    },
    [tasks],
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div className="w-96 h-96 bg-white shadow-md rounded-lg flex flex-col p-2 px-5">
        <h1 className="text-2xl font-bold flex justify-center items-center mb-5">
          To-do list
        </h1>
        <div className="flex flex-row gap-1 justify-center items-center">
          <Input updateValue={setMyNewTask} value={myNewTask} />

          <button
            className="w-9 h-9 bg-blue-500 text-white rounded-full flex justify-center items-center text-center p-0"
            onClick={() => handleAddTask()}>
            <p className="mb-0.5">+</p>
          </button>
        </div>
        <div className="w-full flex flex-row gap-2 py-2">
          <Button onClick={() => setTab('all')} display="All" />
          <Button onClick={() => setTab('completed')} display="Completed" />
          <Button onClick={() => setTab('to-do')} display="To-do" />
        </div>
        <div className="overflow-auto m-2">
          <ul className="w-full h-ful flex flex-col gap-2">
            {visibleTask.map(task => (
              <li key={task.id} className="flex flex-row gap-1 items-center">
                <input
                  type="checkbox"
                  className="h-full text-lg flex justify-center items-center text-center"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                />
                <p
                  className={
                    task.completed ? 'line-through text-gray-400/70' : ''
                  }>
                  {task.name}
                </p>
                <button
                  className="w-9 h-9 text-xs text-red-500 flex justify-center items-center text-center p-2"
                  onClick={() => handleRemoveTask(task.id)}>
                  <p className="mb-0.5">remove</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
