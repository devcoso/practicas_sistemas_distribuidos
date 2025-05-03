import { useState, useRef } from 'react';
import { useLoaderData, redirect, useNavigate } from 'react-router';

import TaskService from '../services/tasks';
import { verify } from '../services/auth';

export const loader = async () => {
  const user = await verify();
  if (!user) {
    console.log('User not logged in');
    return redirect('/auth');
  }
  const tasks = await TaskService.getTasks();
  return {
    tasks: tasks,
    user: user.user
  }
}

function Tasks() {

  const data = useLoaderData();

  const navigate = useNavigate();

  const [user, setUser] = useState(data.user);
  const [tasks, setTasks] = useState(data.tasks);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState(false);

  const timeOutId = useRef(null);

  const showAlert = (message, status) => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
    }
    setMessage(message);
    setMessageStatus(status);
    setIsVisible(true);
    timeOutId.current = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // 1 second
  };

  const handleAddTask = async () => {
    if (!newTask) {
      showAlert('Please enter a task', false);
      return;
    }
    const task = await TaskService.createTask(newTask);
    if (!task) {
      showAlert('Error creating task', false);
      return;
    };
    setTasks([...tasks, task]);
    setNewTask('');
    showAlert('Task created successfully', true);
  };

  const handleDeleteTask = async(id) => {
    const response = await TaskService.deleteTask(id);
    if (!response) {
      showAlert('Error deleting task', false);
      return;
    };
    showAlert('Task deleted successfully', true);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setEditingText(task.title);
  };

  const handleEditTask = async (task) => {
    if (!editingText) {
      showAlert('Please enter a title', false);
      return;
    }

    const response = await TaskService.updateTask(task.id, { title: editingText, done: task.done });
    if (!response) {
      showAlert('Error updating task', false);
      return;
    };
    showAlert('Task updated successfully', true);
    const updatedTasks = tasks.map((t) =>
      t.id ===  task.id ? { ...task, title: editingText } : t
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditingText('');
  };
  
  const handleToggleDone = async(task) => {
    const updatedTask = { ...task, done: !task.done };
    const response = await TaskService.updateTask(task.id, updatedTask);
    console.log(response);
    if (!response) {
      showAlert('Error updating task', false);
      return;
    };
    showAlert('Task updated successfully', true);
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  }

  return (
    <div className="py-6 px-2 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-3xl mb-4 gap-2">
        <h1 className="font-bold text-lime-600">{user.username}</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/auth');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center text-lime-600 py-8">Tasks</h1>
      <p
        className={`${
          !messageStatus ? 'bg-red-800' : 'bg-lime-600'
        } text-white p-2 rounded-lg text-center md:max-w-1/2 top-0 ${isVisible ? 'absolute' : 'hidden'} my-4`}
      >
        {message}
      </p>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="border border-gray-300 rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-700"
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-4 w-full md:max-w-3xl">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between items-center"
          >
            <div className='flex justify-between items-center w-full text-sm text-gray-600 font-bold'>
              <p>{task.id}</p>
              <p>{task.username}</p>
            </div>
            {editingTask === task.id ? (
              <div className="flex justify-between items-center w-full">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="bg-lime-600 text-white px-3 py-1 rounded-md hover:bg-lime-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-2">
                  <p className="text-gray-800 text-xl font-bold">{task.title}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                task.done
                  ? 'bg-lime-600 text-white hover:bg-lime-700 focus:ring-lime-500'
                  : 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-400'
              }`}
              aria-label={task.done ? 'Mark as not done' : 'Mark as done'}
              onClick={() => handleToggleDone(task)}
            >
              {task.done ? '✓ Done' : 'Mark as Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
