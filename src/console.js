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
  let projects;

  const userInput = prompt(
    "What would you like to do? (add project, update project, delete project, view projects, add task, update task, delete task, view tasks, add subtask, delete subtask, view subtasks, exit)"
  );

  switch (userInput) {
    case "add project":
      const projectTitle = prompt("Enter the project title:");
      const newProject = Project(projectTitle);
      ProjectManager.addProject(newProject);
      console.log(`Project "${projectTitle}" added successfully!`);
      break;

      case "update project":
        const oldTitle = prompt("Enter the current project title to update:");
        projects = ProjectManager.getProjects();
        const projectToUpdate = projects.find((project) => project.title === oldTitle);
      
        if (!projectToUpdate) {
          console.log(`Project with title "${oldTitle}" not found!`);
          break;
        }
      
        const newTitle = prompt("Enter the new project title:");
        const wasUpdated = ProjectManager.updateProject(projectToUpdate.id, newTitle);
        if (wasUpdated) {
          console.log(`Project "${oldTitle}" updated successfully to "${newTitle}"!`);
        } else {
          console.log(
            `Unable to update project "${oldTitle}". The new title "${newTitle}" might already exist.`
          );
        }
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
      projects = ProjectManager.getProjects();
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

      const newTask = Task(null, taskProjectTitle, taskTitle, taskDescription, dueDate, priority);
      TaskManager.addTask(newTask);
      console.log(`Task "${taskTitle}" added to project "${taskProjectTitle}".`);
      break;

    case "update task":
      // Step 1: Ask for the project title and verify it exists
      const updateTaskProjectTitle = prompt("Enter the project title for the task:");
      const projectExistsForUpdate = ProjectManager.getProjects().some(
        (project) => project.title === updateTaskProjectTitle
      );
    
      if (!projectExistsForUpdate) {
        console.log(`Project "${updateTaskProjectTitle}" does not exist!`);
        break;
      }
    
      // Step 2: Ask for the task title and find the task
      const updateTaskTitle = prompt("Enter the task title to update:");
      const tasksInProject = TaskManager.getTasksByProject(updateTaskProjectTitle);
    
      const taskToUpdate = tasksInProject.find(
        (task) => task.getTask().taskTitle === updateTaskTitle
      );
    
      if (!taskToUpdate) {
        console.log(`Task "${updateTaskTitle}" not found in project "${updateTaskProjectTitle}"!`);
        break;
      }
    
      // Step 3: Ask for updated fields from the user
      const updatedTitle = prompt(
        `Enter the new task title (current: "${taskToUpdate.getTask().taskTitle}"):`
      );
      const updatedDescription = prompt(
        `Enter the new task description (current: "${taskToUpdate.getTask().taskDescription || "N/A"}"):`
      );
      const updatedDueDate = prompt(
        `Enter the new task due date (current: "${taskToUpdate.getTask().dueDate || "N/A"}"):`
      );
      const updatedPriority = prompt(
        `Enter the new task priority (current: "${taskToUpdate.getTask().priority || "N/A"}"):`
      );
    
      // Step 4: Construct the updated fields object, keeping unchanged fields the same
      const updatedFields = {
        taskTitle: updatedTitle || taskToUpdate.getTask().taskTitle,
        taskDescription: updatedDescription || taskToUpdate.getTask().taskDescription,
        dueDate: updatedDueDate || taskToUpdate.getTask().dueDate,
        priority: updatedPriority || taskToUpdate.getTask().priority,
      };
    
      // Step 5: Update the task based on its ID
      const wasTaskUpdated = TaskManager.updateTask(taskToUpdate.getTask().id, updatedFields);
    
      if (wasTaskUpdated) {
        console.log(`Task "${updateTaskTitle}" updated successfully!`);
      } else {
        console.log(`Failed to update task "${updateTaskTitle}".`);
      }
      break;

      case "delete task":
        const deleteTaskProjectTitle = prompt("Enter the project title for the task:");
        const projectExistsForDelete = ProjectManager.getProjects().some(
          (project) => project.title === deleteTaskProjectTitle
        );
      
        if (!projectExistsForDelete) {
          console.log(`Project "${deleteTaskProjectTitle}" does not exist!`);
          break;
        }
      
        const taskTitleToDelete = prompt("Enter the task title to delete:");
        const tasksForDeletion = TaskManager.getTasksByProject(deleteTaskProjectTitle);
        const taskToDelete = tasksForDeletion.find(
          (task) => task.getTask().taskTitle === taskTitleToDelete
        );
      
        if (taskToDelete) {
          const wasTaskDeleted = TaskManager.deleteTask(taskToDelete.getTask().id);
          if (wasTaskDeleted) {
            console.log(`Task "${taskTitleToDelete}" deleted successfully.`);
          } else {
            console.log(`Failed to delete task "${taskTitleToDelete}".`);
          }
        } else {
          console.log(`Task "${taskTitleToDelete}" not found in project "${deleteTaskProjectTitle}".`);
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
        const newSubTask = SubTask(null, parentTaskTitle, subTaskDescription);
        SubTaskManager.addSubTask(newSubTask);
        console.log(`SubTask "${subTaskDescription}" added to task "${parentTaskTitle}".`);
        break;

        case "update subtask":
        // Ask for the parent task title
        const parenTaskTitle = prompt("Enter the title of the parent task:");

        // Fetch subtasks for the parent task
        const subTasksForParent = SubTaskManager.getSubTasksByTask(parenTaskTitle);

        // Check if there are subtasks for the provided parent task
        if (subTasksForParent.length === 0) {
          console.log(`No subtasks found for the parent task "${parentTaskTitle}".`);
          break;
        }

        // Display the subtasks to the user for selection
        console.log(`Subtasks for "${parenTaskTitle}":`);
        subTasksForParent.forEach((subTask, index) => {
          console.log(
            `${index + 1}. ${subTask.getSubTask().subTaskDescription} (ID: ${subTask.getSubTask().id}, Completed: ${subTask.getSubTask().isComplete})`
          );
        });

        // Ask the user to select a subtask by its number
        const subTaskNumber = parseInt(
          prompt("Enter the number of the subtask you want to update:"),
          10
        );

        if (isNaN(subTaskNumber) || subTaskNumber < 1 || subTaskNumber > subTasksForParent.length) {
          console.log("Invalid subtask number selected.");
          break;
        }

        // Get the selected subtask
        const selectedSubTask = subTasksForParent[subTaskNumber - 1];

        // Prepare updated fields
        const subTaskFieldsToUpdate = {};

        const newDescription = prompt(
          "Enter new description (leave blank to skip):"
        );
        if (newDescription) subTaskFieldsToUpdate.subTaskDescription = newDescription;

        const isCompleteInput = prompt(
          "Is the subtask complete? (yes/no/leave blank to skip):"
        );
        if (isCompleteInput === "yes") subTaskFieldsToUpdate.isComplete = true;
        else if (isCompleteInput === "no") subTaskFieldsToUpdate.isComplete = false;

        // Update the subtask using its ID
        const wasSubTaskUpdated = SubTaskManager.updateSubTask(
          selectedSubTask.getSubTask().id,
          subTaskFieldsToUpdate
        );

        if (wasSubTaskUpdated) {
          console.log(
            `SubTask "${selectedSubTask.getSubTask().subTaskDescription}" updated successfully.`
          );
        } else {
          console.log(
            `Failed to update SubTask "${selectedSubTask.getSubTask().subTaskDescription}".`
          );
        }
        break;
        
        case "delete subtask":
            // Ask for the parent task title
            const parentTaskTitleToDelete = prompt("Enter the title of the parent task:");
          
            // Fetch subtasks for the parent task
            const subTasksForParentToDelete = SubTaskManager.getSubTasksByTask(parentTaskTitleToDelete);
          
            // Check if there are subtasks for the provided parent task
            if (subTasksForParentToDelete.length === 0) {
              console.log(`No subtasks found for the parent task "${parentTaskTitleToDelete}".`);
              break;
            }
          
            // Display the subtasks to the user for selection
            console.log(`Subtasks for "${parentTaskTitleToDelete}":`);
            subTasksForParentToDelete.forEach((subTask, index) => {
              console.log(
                `${index + 1}. ${subTask.getSubTask().subTaskDescription} (ID: ${subTask.getSubTask().id}, Completed: ${subTask.getSubTask().isComplete})`
              );
            });
          
            // Ask the user to select a subtask by its number
            const subTaskNumberToDelete = parseInt(
              prompt("Enter the number of the subtask you want to delete:"),
              10
            );
          
            if (isNaN(subTaskNumberToDelete) || subTaskNumberToDelete < 1 || subTaskNumberToDelete > subTasksForParentToDelete.length) {
              console.log("Invalid subtask number selected.");
              break;
            }
          
            // Get the selected subtask
            const selectedSubTaskToDelete = subTasksForParentToDelete[subTaskNumberToDelete - 1];
          
            // Delete the selected subtask using its ID
            const wasSubTaskDeleted = SubTaskManager.deleteSubTask(selectedSubTaskToDelete.getSubTask().id);
          
            if (wasSubTaskDeleted) {
              console.log(`SubTask "${selectedSubTaskToDelete.getSubTask().subTaskDescription}" deleted successfully.`);
            } else {
              console.log(`Failed to delete SubTask "${selectedSubTaskToDelete.getSubTask().subTaskDescription}".`);
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

export default promptUser;