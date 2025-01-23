// managers/SubTaskManager.js
import SubTask from "../factories/SubTask.js";

const SubTaskManager = (() => {
  const subTasks = [];

  const loadSubTasks = () => {
    const savedSubTasks = JSON.parse(localStorage.getItem("subTasks")) || [];
    savedSubTasks.forEach((subTaskData) => {
      const subTask = SubTask(
        subTaskData.parentTaskTitle,
        subTaskData.subTaskDescription,
        subTaskData.isComplete
      );
      subTasks.push(subTask);
      console.log(`Loaded SubTask: "${subTaskData.subTaskDescription}"`);
    });
  };

  const saveSubTasks = () => {
    const subTaskData = subTasks.map((subTask) => subTask.getSubTask());
    localStorage.setItem("subTasks", JSON.stringify(subTaskData));
  };

  const addSubTask = (subTask) => {
    subTasks.push(subTask);
    saveSubTasks();
    console.log(`SubTask "${subTask.getSubTask().subTaskDescription}" added.`);
  };

  const deleteSubTask = (subTaskDescription) => {
    const index = subTasks.findIndex(
      (subTask) => subTask.getSubTask().subTaskDescription === subTaskDescription
    );

    if (index !== -1) {
      subTasks.splice(index, 1);
      saveSubTasks();
      console.log(`SubTask "${subTaskDescription}" deleted successfully.`);
      return true;
    } else {
      console.log(`SubTask "${subTaskDescription}" not found.`);
      return false;
    }
  };

  const getSubTasksByTask = (parentTaskTitle) =>
    subTasks.filter(
      (subTask) => subTask.getSubTask().parentTaskTitle === parentTaskTitle
    );

  const getAllSubTasks = () => subTasks;

  return { loadSubTasks, addSubTask, deleteSubTask, getSubTasksByTask, getAllSubTasks };
})();

export default SubTaskManager;