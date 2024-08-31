// Responsive filter buttons
export function initFilterButtons() {
  window.addEventListener('resize', moveFilterOptionsToMain);
  window.addEventListener('load', moveFilterOptionsToMain);
}

// Tab Top Navigation
export function initTabTopNavigation() {
  const tabs = document.querySelectorAll('.tab');
  const states = document.querySelectorAll('.table__state');
  tabs.forEach((item, index) => {
    item.addEventListener('click', () => {
      tabs.forEach((i) => i.classList.remove('active'));
      states.forEach((s) => s.classList.remove('active'));
      item.classList.add('active');
      states[index].classList.add('active');
    });
  });
}

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
    arrayLocalStorage.push(newTask);
    localStorage.setItem('myArr', JSON.stringify(arrayLocalStorage));
    formAdd.reset();
    location.reload();
  });
}

export function initFilterOptions() {
  const filterButtons = document.querySelectorAll('.header__filterOption');
  const storedFilters = JSON.parse(localStorage.getItem('activeFilters')) || [];
  filterButtons.forEach((item) => {
    if (storedFilters.includes(item.textContent.trim())) {
      item.classList.add('activeFilters');
    }
  });
  filterDataBase(storedFilters);

  filterButtons.forEach((item) => {
    item.addEventListener('click', () => {
      const filterValue = item.textContent.trim();
      if (storedFilters.includes(filterValue)) {
        storedFilters.splice(storedFilters.indexOf(filterValue), 1);
        item.classList.remove('activeFilters');
      } else {
        storedFilters.push(filterValue);
        item.classList.add('activeFilters');
      }
      localStorage.setItem('activeFilters', JSON.stringify(storedFilters));
      filterDataBase(storedFilters);
    });
  });
}

export function clearContainerTable(classTable) {
  const table = document.getElementsByClassName(classTable)[0];
  table.innerHTML = '';
}

export function moveFilterOptionsToMain() {
  const mainFilterOptions = document.querySelector('.main__filterOptions');
  const headerFilterOptions = document.querySelector('.header__filterOptions');
  const header = document.querySelector('.header__nav');

  if (window.innerWidth <= 920) {
    if (headerFilterOptions && !mainFilterOptions.contains(headerFilterOptions)) {
      mainFilterOptions.appendChild(headerFilterOptions);
    }
  } else {
    if (header && headerFilterOptions && !header.contains(headerFilterOptions)) {
      header.appendChild(headerFilterOptions);
    }
  }
}

export function toggleModal(modalId, buttonId, closeId, cardText = null) {
  const modal = document.getElementById(modalId);
  const button = buttonId ? document.getElementById(buttonId) : null;
  const updateContent = document.querySelector('.modal__updateContent');
  const template = document.getElementById('template__updateTask');

  updateContent.innerHTML = '';

  if (button) {
    button.onclick = function () {
      modal.style.display = 'flex';
    };
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
  closeButton.onclick = function () {
    modal.style.display = 'none';
  };
}

export function generateCard(cardsData, nameContainer, nameStatus) {
  const dataFilter = cardsData?.filter((item) => item.status === nameStatus);
  const template = document.getElementById('template__card');
  const container = document.querySelector(`.table__stateContainer.${nameContainer}`);
  dataFilter?.forEach((item, index) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.card__titleMain').textContent = item.title;
    clone.querySelector('.card__status').textContent = item.status;
    clone.querySelector('.card__descriptionDetail').textContent = item.description;
    clone.querySelector('.card__moreInfoDetail.text__category').textContent = item.type;
    clone.querySelector('.card__moreInfoDetail.text__dueDate').textContent = item.date;
    container.appendChild(clone);
  });
}

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

export function filterDataBase(filters) {
  let arrayLocalStorage = JSON.parse(localStorage.getItem('myArr')) || [];
  if (filters.length > 0) {
    arrayLocalStorage = arrayLocalStorage.filter((item) => filters.includes(item.type));
  }
  clearContainerTable('table__toDos');
  clearContainerTable('table__inProcess');
  clearContainerTable('table__done');
  generateCard(arrayLocalStorage, 'table__toDos', 'To Do');
  generateCard(arrayLocalStorage, 'table__inProcess', 'En Proceso');
  generateCard(arrayLocalStorage, 'table__done', 'Terminado');
}
