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

export function addDataToLocalStorage() {}

export function deleteDataToLocalStorage() {}

export function updateDataToLocalStorage() {}
