import { moveFilterOptionsToMain } from './functions.js';

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

window.addEventListener('resize', moveFilterOptionsToMain);
window.addEventListener('load', moveFilterOptionsToMain);
