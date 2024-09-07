import { clearContainerTable } from '../../utils/clearContainer.js';
import { generateCard } from '../Cards/cards.js';
import { showPercentage } from '../Stats/stats.js';

export function moveCardByStatus(cardElement) {
  const title = cardElement.querySelector('.card__titleMain').textContent;
  const status = cardElement.querySelector('.card__status').textContent;
  let newStatus;
  switch (status) {
    case 'To Do':
      newStatus = 'En Proceso';
      break;
    case 'En Proceso':
      newStatus = 'Terminado';
      break;
    case 'Terminado':
      newStatus = 'Eliminar';
      break;
    default:
      newStatus = '';
  }
  let arrayLocalStorage = JSON.parse(localStorage.getItem('myArr')) || [];
  const indexItem = arrayLocalStorage.findIndex((item) => item.title === title);
  if (newStatus === 'Eliminar') {
    if (indexItem !== -1) {
      arrayLocalStorage.splice(indexItem, 1);
      localStorage.setItem('myArr', JSON.stringify(arrayLocalStorage));
    }
  } else if (indexItem !== -1) {
    arrayLocalStorage[indexItem].status = newStatus;
    const [item] = arrayLocalStorage.splice(indexItem, 1);
    arrayLocalStorage.push(item);
  } else {
    return;
  }
  localStorage.setItem('myArr', JSON.stringify(arrayLocalStorage));
  clearContainerTable('table__toDos');
  clearContainerTable('table__inProcess');
  clearContainerTable('table__done');
  generateCard(arrayLocalStorage, 'table__toDos', 'To Do');
  generateCard(arrayLocalStorage, 'table__inProcess', 'En Proceso');
  generateCard(arrayLocalStorage, 'table__done', 'Terminado');
  showPercentage(arrayLocalStorage);
}
