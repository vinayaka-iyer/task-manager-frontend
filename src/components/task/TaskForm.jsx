"use client"
import {
  useEffect,
  useState
} from "react"
import { useNavigate } from "react-router-dom"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Textarea
} from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { createTask, editTask, getTask } from "@/api/tasks"

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Your Task must have a Title.",
  }),
  description: z.string().optional(),
  status: z.string().default('Pending')
});

export default function TaskForm({type, task, onSubmitSuccess}) {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values) {
    try {
      console.log(values);
      if (type === "create"){
        handleCreate(values)
      } else {
        handleSave(values, task)
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const handleCreate = (data) => {
      if (window.confirm(`Are you sure you want to create "${data.title}" task?`)) {
          createTask(data)
              .then(() => {
                  navigate('/tasks')
                  toast(
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                      Task created succesffully!
                    </pre>
                  ); 
              })
              .catch((error) => {
                  console.error("Error creating task:", error);
              });
      }
  };
  
  const handleSave = (data, task) => {
    editTask(data, task)
        .then(() => {
          // Simulate successful submission
          setTimeout(() => {
            onSubmitSuccess(); // Close the dialog upon success
        }, 500);
          toast(
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              Task edited succesffully!
            </pre>
          );
        })
        .catch((error) => {
            console.error("Error creating task:", error);
            toast.error("Failed to edit the task. Please try again.");
        });
}

const fetchTask = async (id) => {
  try {
      const data = await getTask(id);
      form.reset({
          title: data.title,
          description: data.description,
          status: data.status
      });
  } catch (err) {
      console.error("Error fetching task:", err);
  }
};

useEffect(() => {
  if (task) {
      fetchTask(task._id); // Fetch and set the task data
  }
}, []); // Re-run when taskId changes
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto p-5 border rounded-md w-full">
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                placeholder="Title"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select  {...field} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
                
              <FormMessage />
            </FormItem>
          )}
        />
        {type === "create"? <Button type="submit">Submit</Button> :  <Button type="submit">Save</Button> }
      </form>
    </Form>
  )
}