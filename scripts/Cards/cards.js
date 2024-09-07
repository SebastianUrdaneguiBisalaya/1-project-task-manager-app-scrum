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
