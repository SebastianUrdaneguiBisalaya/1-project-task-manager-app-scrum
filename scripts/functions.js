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

export function getNameOfCategoryTask(event) {
  const value = event.target.textContent.trim();
  console.log(value);
}

export function toggleModal(modalId, buttonId, closeId, cardText = null) {
  const modal = document.getElementById(modalId);
  const button = buttonId ? document.getElementById(buttonId) : null;
  const closeButton = document.getElementById(closeId);

  if (button) {
    button.onclick = function () {
      modal.style.display = 'flex';
    };
    if (cardText) {
      console.log(cardText);
    }
  } else {
    modal.style.display = 'flex';
    if (cardText) {
      console.log(cardText);
    }
  }

  closeButton.onclick = function () {
    modal.style.display = 'none';
  };
}

export function generateCard(cardsData, nameContainer) {
  const template = document.getElementById('template__card');
  const container = document.querySelector(`.table__stateContainer.${nameContainer}`);
  cardsData.forEach((item, index) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.card__titleMain').textContent = item.title;
    clone.querySelector('.card__descriptionDetail').textContent = item.description;
    clone.querySelector('.card__moreInfoDetail.text__category').textContent = item.type;
    clone.querySelector('.card__moreInfoDetail.text__dueDate').textContent = item.date;
    container.appendChild(clone);
  });
}

export function moveCardByStatus() {}

export function addDataToLocalStorage() {}

export function deleteDataToLocalStorage() {}

export function updateDataToLocalStorage() {}
