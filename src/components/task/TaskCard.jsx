import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { deleteTask } from "@/api/tasks";
import { EditTask } from "./EditTask";

const TaskCard = ({ task, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
        deleteTask(task._id)
            .then(() => {
                onDelete(task._id); // Update the parent state
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    }
};

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <p className="text-gray-500 text-sm">Status: {task.status}</p>
        <p className="text-gray-500 text-sm">Created: {task.created_at}</p>
      </CardContent>
      <CardFooter>
        {/* <Button variant="secondary" className="mx-2" onClick={handleEdit}>
          Edit
        </Button> */}
        <EditTask task={task} />
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
