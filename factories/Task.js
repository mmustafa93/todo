// factories/Task.js
const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  

const Task = (existingId = null, projectId, taskTitle, taskDescription = "", dueDate = "", priority = "", isCompleted = false) => {

    const id = existingId || generateId();

    let taskDetails = {
      id,
      projectId,
      taskTitle,
      taskDescription,
      dueDate,
      priority,
      isCompleted
    };
  
    const getTask = () => taskDetails;
  
    const updateTask = (updatedFields) => {
      taskDetails = { ...taskDetails, ...updatedFields };
    };
  
    return { getTask, updateTask };
  };
  
  export default Task;