// index.js
import Project from "../factories/Project.js";
import ProjectManager from "../managers/ProjectManager.js";
import Task from "../factories/Task.js";
import TaskManager from "../managers/TaskManager.js";
import SubTask from "../factories/SubTask.js";
import SubTaskManager from "../managers/SubTaskManager.js";

// Initialize the app
console.log("Welcome to Todo App!");
ProjectManager.loadProjects();
TaskManager.loadTasks();

const promptUser = () => {
  const userInput = prompt(
    "What would you like to do? (add project, delete project, view projects, add task, delete task, view tasks, add subtask, delete subtask, view subtasks, exit)"
  );

  switch (userInput) {
    case "add project":
      const projectTitle = prompt("Enter the project title:");
      const newProject = Project(projectTitle);
      ProjectManager.addProject(newProject);
      console.log(`Project "${projectTitle}" added successfully!`);
      break;

    case "delete project":
      const deleteProjectTitle = prompt("Enter the project title to delete:");
      const wasDeleted = ProjectManager.deleteProject(deleteProjectTitle);
      if (wasDeleted) {
        console.log(`Project "${deleteProjectTitle}" deleted successfully!`);
      } else {
        console.log(`Unable to delete project "${deleteProjectTitle}". It does not exist.`);
      }
      break;

    case "view projects":
      console.log("Here are your projects:");
      const projects = ProjectManager.getProjects();
      projects.forEach((project, index) => console.log(`${index + 1}: ${project.title}`));
      break;

    case "add task":
      const taskProjectTitle = prompt("Enter the project title for the task:");
      const projectExists = ProjectManager.getProjects().some(
        (project) => project.title === taskProjectTitle
      );

      if (!projectExists) {
        console.log(`Project "${taskProjectTitle}" does not exist!`);
        break;
      }

      const taskTitle = prompt("Enter the task title:");
      const taskDescription = prompt("Enter the task description (optional):");
      const dueDate = prompt("Enter the task due date (optional):");
      const priority = prompt("Enter the task priority (optional):");

      const newTask = Task(taskProjectTitle, taskTitle, taskDescription, dueDate, priority);
      TaskManager.addTask(newTask);
      console.log(`Task "${taskTitle}" added to project "${taskProjectTitle}".`);
      break;

    case "delete task":
      const taskTitleToDelete = prompt("Enter the task title to delete:");
      const wasTaskDeleted = TaskManager.deleteTask(taskTitleToDelete);
      if (wasTaskDeleted) {
        console.log(`Task "${taskTitleToDelete}" deleted successfully.`);
      } else {
        console.log(`Unable to delete task "${taskTitleToDelete}". It does not exist.`);
      }
      break;

    case "view tasks":
      const viewTasksProject = prompt("Enter the project title to view tasks:");
      const projectTasks = TaskManager.getTasksByProject(viewTasksProject);

      if (projectTasks.length === 0) {
        console.log(`No tasks found for project "${viewTasksProject}".`);
      } else {
        console.log(`Tasks for project "${viewTasksProject}":`);
        projectTasks.forEach((task, index) => {
          const details = task.getTask();
          console.log(
            `${index + 1}: ${details.taskTitle} (Due: ${details.dueDate}, Priority: ${details.priority})`
          );
        });
      }
      break;

      case "add subtask":
        const parentTaskTitle = prompt("Enter the parent task title:");
        const taskExists = TaskManager.getTasks().some(
          (task) => task.getTask().taskTitle === parentTaskTitle
        );
  
        if (!taskExists) {
          console.log(`Task "${parentTaskTitle}" does not exist!`);
          break;
        }
  
        const subTaskDescription = prompt("Enter the subtask description:");
        const newSubTask = SubTask(parentTaskTitle, subTaskDescription);
        SubTaskManager.addSubTask(newSubTask);
        console.log(`SubTask "${subTaskDescription}" added to task "${parentTaskTitle}".`);
        break;
  
      case "delete subtask":
        const subTaskDescriptionToDelete = prompt("Enter the subtask description to delete:");
        const wasSubTaskDeleted = SubTaskManager.deleteSubTask(subTaskDescriptionToDelete);
        if (wasSubTaskDeleted) {
          console.log(`SubTask "${subTaskDescriptionToDelete}" deleted successfully.`);
        } else {
          console.log(`Unable to delete subtask "${subTaskDescriptionToDelete}". It does not exist.`);
        }
        break;
  
      case "view subtasks":
        const taskToViewSubTasks = prompt("Enter the parent task title to view subtasks:");
        const subTasks = SubTaskManager.getSubTasksByTask(taskToViewSubTasks);
  
        if (subTasks.length === 0) {
          console.log(`No subtasks found for task "${taskToViewSubTasks}".`);
        } else {
          console.log(`SubTasks for task "${taskToViewSubTasks}":`);
          subTasks.forEach((subTask, index) => {
            const details = subTask.getSubTask();
            console.log(
              `${index + 1}: ${details.subTaskDescription} (Complete: ${details.isComplete})`
            );
          });
        }
        break;
  
    case "exit":
      console.log("Exiting Todo App. Goodbye!");
      return;

    default:
      console.log("Invalid option. Please try again.");
  }

  // Loop back to prompt the user again
  promptUser();
};

promptUser();