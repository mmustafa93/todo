// factories/SubTask.js
const SubTask = (parentTaskTitle, subTaskDescription, isComplete = false) => {
    let subTaskDetails = {
      parentTaskTitle,
      subTaskDescription,
      isComplete,
    };
  
    const getSubTask = () => subTaskDetails;
  
    const updateSubTask = (updatedFields) => {
      subTaskDetails = { ...subTaskDetails, ...updatedFields };
    };
  
    return { getSubTask, updateSubTask };
  };
  
  export default SubTask;