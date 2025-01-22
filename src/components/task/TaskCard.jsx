import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const TaskCard = ({ task, onEdit, onDelete }) => {
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
        <Button variant="outline" className="mx-2" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
