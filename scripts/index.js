import {
  toggleModal,
  initFilterButtons,
  initTabTopNavigation,
  initTaskEventsByStatus,
  initFormAddSubmission,
  initFilterOptions,
} from './functions.js';

document.addEventListener('DOMContentLoaded', function () {
  initFilterButtons();
  initTabTopNavigation();
  toggleModal('modal__add', 'id__buttonAdd', 'id__modalClose');
  initTaskEventsByStatus();
  initFormAddSubmission();
  initFilterOptions();
});
