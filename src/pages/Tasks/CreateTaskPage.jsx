import TaskForm from "../../components/task/TaskForm"
const CreateTaskPage = () => {
    
    return (
        <>
        <div className="md:w-1/3 mx-auto p-4">
        <h1 className="text-2xl font-bold my-4">Create a Task</h1>
        <TaskForm />
        </div>
        </>
    )
}

export default CreateTaskPage;
