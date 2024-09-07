import { moveCardByStatus } from './move.js';

export function initTaskEventsByStatus() {
  const containerCards = document.querySelectorAll('.table__stateContainer');
  containerCards.forEach((container) => {
    container.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      if (event.target.closest('.card__icon')) {
        event.stopImmediatePropagation();
        moveCardByStatus(card);
      } else if (card) {
        const cardText = {
          title: card.querySelector('.card__titleMain').textContent.trim(),
          description: card.querySelector('.card__descriptionDetail').textContent.trim(),
          dueDate: card.querySelector('.text__dueDate').textContent.trim(),
          category: card.querySelector('.text__category').textContent.trim(),
        };
        toggleModal('modal__update', '', 'id__modalUpdateClose', cardText);
      }
    });
  });
}

export function toggleModal(modalId, buttonId, closeId, cardText = null) {
  const modal = document.getElementById(modalId);
  const button = buttonId ? document.getElementById(buttonId) : null;
  const updateContent = document.querySelector('.modal__updateContent');
  const template = document.getElementById('template__updateTask');

  updateContent.innerHTML = '';

  if (button) {
    button.addEventListener('click', function () {
      modal.style.display = 'flex';
    });
  } else {
    modal.style.display = 'flex';
    if (cardText) {
      const clone = template.content.cloneNode(true);
      clone.querySelector('#titleUpdate').value = cardText?.title;
      clone.querySelector('#descriptionUpdate').value = cardText?.description;
      clone.querySelector('#dateUpdate').value = cardText?.dueDate;
      clone.querySelector('#categoryUpdate').value = cardText?.category;
      updateContent.appendChild(clone);
    }
    updateDataToLocalStorage(cardText?.title);
  }
  const closeButton = document.getElementById(closeId);
  closeButton.addEventListener('click', function () {
    modal.style.display = 'none';
  });
}

export function updateDataToLocalStorage(textTitle) {
  const formUpdate = document.getElementById('update-task-form');
  formUpdate.addEventListener('submit', function (event) {
    event.preventDefault();
    let arrayLocalStorage = JSON.parse(localStorage.getItem('myArr')) || [];
    const index = arrayLocalStorage.findIndex((item) => item.title === textTitle);
    const updateTask = {
      title: document.getElementById('titleUpdate').value.trim(),
      description: document.getElementById('descriptionUpdate').value.trim(),
      type: document.getElementById('categoryUpdate').value.trim(),
      date: document.getElementById('dateUpdate').value.trim(),
    };
    if (index !== -1) {
      arrayLocalStorage[index].title = updateTask.title;
      arrayLocalStorage[index].description = updateTask.description;
      arrayLocalStorage[index].date = updateTask.date;
      arrayLocalStorage[index].type = updateTask.type;
    }
    localStorage.setItem('myArr', JSON.stringify(arrayLocalStorage));
    formUpdate.reset();
    location.reload();
  });
}
