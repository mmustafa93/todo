// managers/TaskManager.js
import Task from "../factories/Task.js";

const TaskManager = (() => {
  const tasks = [];

  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("task")) || [];
    savedTasks.forEach((taskData) => {
      const task = Task(
        taskData.projectTitle,
        taskData.taskTitle,
        taskData.taskDescription,
        taskData.dueDate,
        taskData.priority
      );
      tasks.push(task);
      console.log(`Loaded Task "${taskData.taskTitle}"`);
    });
  };

  const saveTasks = () => {
    const taskData = tasks.map((task) => task.getTask());
    localStorage.setItem("task", JSON.stringify(taskData));
  };

  const addTask = (task) => {
    tasks.push(task);
    saveTasks();
  };

  const deleteTask = (taskTitle) => {
    const index = tasks.findIndex((task) => task.getTask().taskTitle === taskTitle);

    if (index !== -1) {
      tasks.splice(index, 1);
      saveTasks();
      console.log(`Task "${taskTitle}" deleted successfully.`);
      return true;
    } else {
      console.log(`Task "${taskTitle}" not found.`);
      return false;
    }
  };

  const getTasksByProject = (projectTitle) =>
    tasks.filter((task) => task.getTask().projectTitle === projectTitle);

  const getTasks = () => tasks;

  return { loadTasks, addTask, deleteTask, getTasksByProject, getTasks };
})();

export default TaskManager;