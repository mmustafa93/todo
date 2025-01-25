import SubTask from "../factories/SubTask.js";

const SubTaskManager = (() => {
  const loadSubTasks = () => {
    const savedSubTasks = JSON.parse(localStorage.getItem("subTasks")) || [];
    return savedSubTasks.map((subTaskData) =>
      SubTask(
        subTaskData.id,
        subTaskData.parentTaskTitle,
        subTaskData.subTaskDescription,
        subTaskData.isComplete
      )
    );
  };

  const saveSubTasks = (subTasks) => {
    const subTaskData = subTasks.map((subTask) => subTask.getSubTask());
    localStorage.setItem("subTasks", JSON.stringify(subTaskData));
  };

  const addSubTask = (subTask) => {
    const currentSubTasks = loadSubTasks();
    currentSubTasks.push(subTask);
    saveSubTasks(currentSubTasks);
    console.log(`SubTask "${subTask.getSubTask().subTaskDescription}" added.`);
  };

  const deleteSubTask = (id) => {
    let currentSubTasks = loadSubTasks();
    const index = currentSubTasks.findIndex(
      (subTask) => subTask.getSubTask().id === id
    );

    if (index !== -1) {
      currentSubTasks.splice(index, 1);
      saveSubTasks(currentSubTasks);
      console.log(`SubTask with ID "${id}" deleted successfully.`);
      return true;
    } else {
      console.log(`SubTask with ID "${id}" not found.`);
      return false;
    }
  };

  const updateSubTask = (id, updatedFields) => {
    const currentSubTasks = loadSubTasks();
    const subTask = currentSubTasks.find(
      (subTask) => subTask.getSubTask().id === id
    );

    if (subTask) {
      subTask.updateSubTask(updatedFields);
      saveSubTasks(currentSubTasks);
      console.log(`SubTask with ID "${id}" updated successfully.`);
      return true;
    } else {
      console.log(`SubTask with ID "${id}" not found.`);
      return false;
    }
  };

  const getSubTasksByTask = (parentTaskTitle) => {
    const currentSubTasks = loadSubTasks();
    return currentSubTasks.filter(
      (subTask) => subTask.getSubTask().parentTaskTitle === parentTaskTitle
    );
  };

  const getAllSubTasks = () => loadSubTasks();

  return {
    addSubTask,
    deleteSubTask,
    updateSubTask,
    getSubTasksByTask,
    getAllSubTasks,
  };
})();

export default SubTaskManager;