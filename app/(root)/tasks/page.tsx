import HeaderTasks from "@/components/HeaderTasks"
import TasksCards from "@/components/TasksCards"

const TasksPage = () => {
    return (
        <section className="flex flex-col gap-[20px]">
            <HeaderTasks 
                text='Your Tasks'
                showAddTask={true}
            />
            <TasksCards />
        </section>
    )
}

export default TasksPage