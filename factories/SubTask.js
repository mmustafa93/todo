// factories/SubTask.js

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};


const SubTask = (existingId = null, parentTaskId, subTaskDescription) => {
  
  const id = existingId || generateId();
  
  let subTaskDetails = {
      id,
      parentTaskId,
      subTaskDescription,
    };
  
    const getSubTask = () => subTaskDetails;
  
    const updateSubTask = (updatedFields) => {
      subTaskDetails = { ...subTaskDetails, ...updatedFields };
    };
  
    return { getSubTask, updateSubTask };
  };
  
  export default SubTask;