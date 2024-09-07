import { clearContainerTable } from '../../utils/clearContainer.js';
import { generateCard } from '../Cards/cards.js';
import { showPercentage } from '../Stats/stats.js';

// Responsive filter buttons
export function initFilterButtons() {
  window.addEventListener('resize', moveFilterOptionsToMain);
  window.addEventListener('load', moveFilterOptionsToMain);
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

export function moveFilterOptionsToMain() {
  const mainFilterOptions = document.querySelector('.main__filterOptions');
  const headerFilterOptions = document.querySelector('.header__filterOptions');
  const header = document.querySelector('.header__nav');
  const headerIconDark = document.querySelector('.header__iconDark');

  if (window.innerWidth <= 920) {
    if (headerFilterOptions && !mainFilterOptions.contains(headerFilterOptions)) {
      mainFilterOptions.appendChild(headerFilterOptions);
    }
  } else {
    if (header && headerFilterOptions && headerIconDark && !header.contains(headerFilterOptions)) {
      header.insertBefore(headerFilterOptions, headerIconDark);
    }
  }
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
  showPercentage(arrayLocalStorage);
}
