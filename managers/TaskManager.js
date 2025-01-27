import Task from "../factories/Task.js";

const TaskManager = (() => {
  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    return savedTasks.map((taskData) => {
        // Create Task instance for each task in savedTasks
        const task = Task(
            taskData.id,
            taskData.projectId,
            taskData.taskTitle,
            taskData.taskDescription,
            taskData.dueDate,
            taskData.priority
        )

        return task; // return Task instance
    });
};

  const saveTasks = (tasks) => {
    const taskData = tasks.map((task) => task.getTask());
    console.log(taskData);
    localStorage.setItem("tasks", JSON.stringify(taskData));
  };

  const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
  };

  const deleteTask = (taskId) => {
    let tasks = loadTasks();
    console.log(tasks);
    const index = tasks.findIndex((task) => task.getTask().id === taskId);

    if (index !== -1) {
      tasks.splice(index, 1);
      saveTasks(tasks);
      console.log(`Task with ID "${taskId}" deleted successfully.`);
      return true;
    } else {
      console.log(`Task with ID "${taskId}" not found.`);
      return false;
    }
  };

  const getTasksByProject = (projectId) => {
    const tasks = loadTasks();
    return tasks.filter((task) => task.getTask().projectId === projectId);
  };

  const getTasks = () => loadTasks();

  const updateTask = (taskToUpdate) => {
    let tasks = loadTasks()
    const taskIndex = tasks.findIndex((task) => task.getTask().id === taskToUpdate.id);
    if (taskIndex !== -1) {
      // Update the specific task
      tasks[taskIndex].updateTask(taskToUpdate); // Use the factory method
      saveTasks(tasks); // Save updated tasks back to local storage
      console.log(`Task with ID "${taskToUpdate.id}" updated successfully.`);
      return true;
  } else {
      console.log(`Task with ID "${taskToUpdate.id}" not found.`);
      return false;
  }
  };

  return { addTask, deleteTask, getTasksByProject, getTasks, updateTask, loadTasks };
})();

export default TaskManager;