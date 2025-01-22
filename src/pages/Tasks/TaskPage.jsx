import React, { useState, useEffect } from "react";
import { getTasks } from "../../api/tasks";
import TaskCard from "@/components/task/TaskCard";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error
  const [page, setPage] = useState(1); // Current page
  const [pages, setPages] = useState(1) // Total pages
  const [limit] = useState(8); // Tasks per page

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks(page, limit);
      setPages(data.pages)
      setTasks(data.tasks);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]); // Refetch tasks when page changes

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-1/3 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      )}
      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          disabled ={page === pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default TasksPage;
