export function visibilityFilterOptions() {
  const component = document.getElementsByClassName('header__filterOptions')[0];
  const classToDeleteToggle = 'visibility';
  if (window.innerWidth > 920) {
    component.classList.remove(classToDeleteToggle);
  } else {
    component.classList.add(classToDeleteToggle);
  }
}
