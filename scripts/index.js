import { toggleModal, initTaskEventsByStatus } from './CRUD/update.js';
import { initFilterButtons, initFilterOptions } from './Filter/filterOptions.js';
import { initTabTopNavigation } from './TabNavigation/tab.js';
import { initFormAddSubmission } from './CRUD/create.js';
import { darkMode } from './DarkMode/darkmode.js';

document.addEventListener('DOMContentLoaded', function () {
  initFilterButtons();
  initTabTopNavigation();
  toggleModal('modal__add', 'id__buttonAdd', 'id__modalClose');
  initTaskEventsByStatus();
  initFormAddSubmission();
  initFilterOptions();
  darkMode();
});
