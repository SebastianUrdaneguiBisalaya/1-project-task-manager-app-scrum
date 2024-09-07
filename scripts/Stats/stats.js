export function showPercentage(allToDos) {
  const lengthToDos = allToDos.length;
  const toDosDone = allToDos.filter((item) => item.status === 'Terminado').length;
  const percentage = Number(lengthToDos) === 0 ? 0 : (toDosDone / lengthToDos) * 100;
  const mainPercentage = document.getElementsByClassName('percentage')[0];
  if (mainPercentage) {
    mainPercentage.textContent = Math.round(percentage);
  }
  const toDos = document.getElementsByClassName('lengthToDo');
  Array.from(toDos).forEach((item) => {
    item.textContent = allToDos.filter((item) => item.status === 'To Do').length;
  });
  const inProcess = document.getElementsByClassName('lengthInProcess');
  Array.from(inProcess).forEach((item) => {
    item.textContent = allToDos.filter((item) => item.status === 'En Proceso').length;
  });
  const done = document.getElementsByClassName('lengthDone');
  Array.from(done).forEach((item) => {
    item.textContent = allToDos.filter((item) => item.status === 'Terminado').length;
  });
}
