// factories/Task.js
const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  

const Task = (existingId = null, projectTitle, taskTitle, taskDescription = "", dueDate = "", priority = "") => {

    const id = existingId || generateId();

    let taskDetails = {
      projectTitle,
      taskTitle,
      taskDescription,
      dueDate,
      priority,
      id,
    };
  
    const getTask = () => taskDetails;
  
    const updateTask = (updatedFields) => {
      taskDetails = { ...taskDetails, ...updatedFields };
    };
  
    return { getTask, updateTask };
  };
  
  export default Task;