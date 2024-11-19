'use client'
import { useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { Task } from "../../types/type";

const ToDo = () => {
  const [task, setTask] = useState<string>(""); 
  const [description, setDescription] = useState<string>(""); 
  const [tasks, setTasks] = useState<Task[]>([]); 

  const getRandomBorderColor = () => {
    const colors = [
      "border-red-500",
      "border-blue-500",
      "border-green-500",
      "border-yellow-500",
      "border-purple-500",
      "border-pink-500",
      "border-teal-500",
      "border-orange-500",
      "border-gray-500",
      "border-green-500",
      "border-violet-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const addTask = () => {
    if (task.trim() === "" || description.trim() === "") return; 
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        description: description,
        isEditing: false,
        borderColor: getRandomBorderColor(),
      },
    ]);
    setTask(""); 
    setDescription(""); 
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id)); 
  };

  const toggleEdit = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, isEditing: !t.isEditing } : t
      )
    );
  };

  const updateTask = (id: number, newText: string, newDescription: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, text: newText, description: newDescription, isEditing: false }
          : t
      )
    );
  };

  const handleTaskChange = (id: number, field: "text" | "description", value: string) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="shadow-xl rounded-lg p-8 w-full max-w-3xl border-2 border-orange-600">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
          Task ToDo List
        </h1>

        <div className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:ring-orange-500"
          />
          <textarea
            placeholder="Enter description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:ring-orange-500"
          ></textarea>
          <button
            onClick={addTask}
            className="w-full bg-orange-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks added yet!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {tasks.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-lg shadow-md bg-gray-800 ${t.borderColor} border-4 flex flex-col justify-between`}
              >
                {t.isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={t.text}
                      onChange={(e) => handleTaskChange(t.id, "text", e.target.value)}
                      className="w-full p-2 border border-orange-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-orange-400"
                    />
                    <textarea
                      value={t.description}
                      onChange={(e) => handleTaskChange(t.id, "description", e.target.value)}
                      className="w-full p-2 border border-orange-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-orange-400"
                    ></textarea>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t.text}
                    </h3>
                    <p className="text-gray-300">{t.description}</p>
                  </div>
                )}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => toggleEdit(t.id)}
                    className="text-orange-300 hover:text-orange-500 transition"
                  >
                    {t.isEditing ? <FaSave size={18} /> : <FaEdit size={18} />}
                  </button>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDo;
