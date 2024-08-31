import { moveFilterOptionsToMain, getNameOfCategoryTask, toggleModal, generateCard } from './functions.js';

// Code to do responsive mobile the part of filter buttons
let buttonsToFilter = document.querySelectorAll('.header__filterOption');
buttonsToFilter.forEach((item, index) => {
  item.addEventListener('click', getNameOfCategoryTask);
});

window.addEventListener('resize', moveFilterOptionsToMain);
window.addEventListener('load', moveFilterOptionsToMain);

// Code to add functionality of Tab Top Navigation
document.addEventListener('DOMContentLoaded', function () {
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
});

const cardsData = [
  {
    title: 'Aprender Python, R Studio y Machine Learning',
    description: 'Realizar las tareas que dejaron en el curso de Análisis de Datos.',
    type: 'Estudio',
    date: '2024-09-02',
  },
  {
    title: 'Leer sobre Inteligencia Artificial',
    description: 'Estudiar el nuevo artículo sobre IA en educación.',
    type: 'Estudio',
    date: '2024-09-05',
  },
  {
    title: 'Aprender Python, R Studio y Machine Learning',
    description: 'Realizar las tareas que dejaron en el curso de Análisis de Datos.',
    type: 'Estudio',
    date: '2024-09-02',
  },
  {
    title: 'Leer sobre Inteligencia Artificial',
    description: 'Estudiar el nuevo artículo sobre IA en educación.',
    type: 'Estudio',
    date: '2024-09-05',
  },
  {
    title: 'Aprender Python, R Studio y Machine Learning',
    description: 'Realizar las tareas que dejaron en el curso de Análisis de Datos.',
    type: 'Estudio',
    date: '2024-09-02',
  },
  {
    title: 'Leer sobre Inteligencia Artificial',
    description: 'Estudiar el nuevo artículo sobre IA en educación.',
    type: 'Estudio',
    date: '2024-09-05',
  },
  {
    title: 'Aprender Python, R Studio y Machine Learning',
    description: 'Realizar las tareas que dejaron en el curso de Análisis de Datos.',
    type: 'Estudio',
    date: '2024-09-02',
  },
];
// Code to generate cards
generateCard(cardsData, 'table__toDos');
generateCard(cardsData, 'table__inProcess');

// Code to add functionality of Modal
// Modal to Add
toggleModal('modal__add', 'id__buttonAdd', 'id__modalClose');

// Modal to Update
let containerCards = document.querySelectorAll('.table__stateContainer');
containerCards.forEach((item, index) => {
  item.addEventListener('click', function () {
    if (event.target.closest('.card')) {
      const item = event.target.closest('.card');
      const cardText = {
        title: item.querySelector('.card__titleMain').textContent,
      };
      toggleModal('modal__update', '', 'id__modalUpdateClose', cardText);
    }
  });
});
