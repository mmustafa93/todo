// index.js
import Project from "../factories/Project.js";
import ProjectManager from "../managers/ProjectManager.js";

// Initialize the app
console.log("Welcome to Todo App!");
ProjectManager.loadProjects();

// Function to get user input
const promptUser = () => {
  const userInput = prompt("What would you like to do? (add, delete, view, exit)");
    
  switch (userInput) {
    case "add":
      const title = prompt("Enter the project title:");
      const newProject = Project(title);
      ProjectManager.addProject(newProject);
      console.log(`Project "${title}" added successfully!`);
      break;

      case "delete":
        let deleteTitle = prompt("Enter the project title to delete:");
        if (!deleteTitle) {
          console.log("No project title provided!");
          break; // Exit the case if no input is given
        }
        deleteTitle = deleteTitle.trim(); // Remove leading/trailing spaces
        console.log(`User entered: "${deleteTitle}"`);
        
        const wasDeleted = ProjectManager.deleteProject(deleteTitle); 
        console.log(`Was project deleted? ${wasDeleted}`);
        
        if (wasDeleted) {
          console.log(`Project "${deleteTitle}" deleted successfully!`);
        } else {
          console.log(`Unable to delete project "${deleteTitle}". It does not exist.`);
        }
        break;

    case "view":
      console.log("Here are your projects:");
      const projects = ProjectManager.getProjects();
      projects.forEach((project, index) => console.log(`${index + 1}: ${project.title}`));
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