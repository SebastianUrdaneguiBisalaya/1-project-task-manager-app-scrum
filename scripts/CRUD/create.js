export function initFormAddSubmission() {
  const formAdd = document.getElementById('add-task-form');
  formAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTask = {
      title: document.getElementById('titleAdd').value,
      status: 'To Do',
      description: document.getElementById('descriptionAdd').value,
      type: document.getElementById('categoryAdd').value,
      date: document.getElementById('dateAdd').value,
    };
    let arrayLocalStorage = JSON.parse(localStorage.getItem('myArr')) || [];
    const searchIdHistorical = arrayLocalStorage.filter((item) => item.title === newTask.title).length;
    if (searchIdHistorical === 0) {
      arrayLocalStorage.push(newTask);
      localStorage.setItem('myArr', JSON.stringify(arrayLocalStorage));
    } else {
      alert('🚀 Recuerda que el título de la tarea no debe duplicarse.');
    }
    formAdd.reset();
    location.reload();
  });
}
