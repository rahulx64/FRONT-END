import React, { useState } from "react";

const Form = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          To-Do List Application
        </h1>

        {/* Input and Add Button */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            placeholder="Add new task"
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow text-blue-500 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="mt-4 space-y-2">
          {tasks.map((x, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-100 p-3 rounded shadow hover:bg-gray-200 transition"
            >
              <li
                onClick={() => toggleTask(i)}
                className={`cursor-pointer ${
                  x.completed ? "line-through text-red-500" : "text-gray-800"
                }`}
              >
                {x.text}
              </li>

              <button
                onClick={() => handleDelete(i)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
