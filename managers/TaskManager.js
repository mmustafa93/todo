import Task from "../factories/Task.js";

const TaskManager = (() => {
  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    return savedTasks.map((taskData) => {
        // Create Task instance for each task in savedTasks
        const task = Task(
            taskData.id,
            taskData.projectTitle,
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
    localStorage.setItem("tasks", JSON.stringify(taskData));
  };

  const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
  };

  const deleteTask = (taskId) => {
    let tasks = loadTasks();
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

  const getTasksByProject = (projectTitle) => {
    const tasks = loadTasks();
    return tasks.filter((task) => task.getTask().projectTitle === projectTitle);
  };

  const getTasks = () => loadTasks();

  const updateTask = (taskId, updatedFields) => {
    let tasks = loadTasks();
    const task = tasks.find((task) => task.getTask().id === taskId);

    if (task) {
      task.updateTask(updatedFields);
      saveTasks(tasks);
      console.log(`Task with ID "${taskId}" updated successfully.`);
      return true;
    } else {
      console.log(`Task with ID "${taskId}" not found.`);
      return false;
    }
  };

  return { addTask, deleteTask, getTasksByProject, getTasks, updateTask, loadTasks };
})();

export default TaskManager;