// factories/Task.js
const Task = (projectTitle, taskTitle, taskDescription = "", dueDate = "", priority = "") => {
    let taskDetails = {
      projectTitle,
      taskTitle,
      taskDescription,
      dueDate,
      priority,
    };
  
    const getTask = () => taskDetails;
  
    const updateTask = (updatedFields) => {
      taskDetails = { ...taskDetails, ...updatedFields };
    };
  
    return { getTask, updateTask };
  };
  
  export default Task;