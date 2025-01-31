import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TaskForm from "./TaskForm";
import { useEffect, useState } from "react";

export function EditTask({ task, setReload }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setReload((prev) => !prev);
    setIsOpen(false); // Close the dialog
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mr-2 "
          onClick={() => setIsOpen(true)}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your Task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <TaskForm type="edit" task={task} onSubmitSuccess={handleClose} />
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
