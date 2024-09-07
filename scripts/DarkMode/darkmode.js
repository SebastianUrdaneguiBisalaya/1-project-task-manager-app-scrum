export function darkMode() {
  const button = document.getElementsByClassName('header__iconDark')[0];
  const imgDark = document.querySelector('.header__icon--dark');
  let dark = JSON.parse(localStorage.getItem('darkMode')) || false;
  function applyDarkMode() {
    if (dark) {
      document.documentElement.style.setProperty('--color-white', '#28282B');
      document.documentElement.style.setProperty('--color-black', '#fff');
      imgDark.src = '../../assets/img/light-theme.svg';
    } else {
      document.documentElement.style.setProperty('--color-white', '#fff');
      document.documentElement.style.setProperty('--color-black', '#000');
      imgDark.src = '../../assets/img/dark-theme.svg';
    }
  }
  applyDarkMode();
  if (button) {
    button.addEventListener('click', function () {
      dark = !dark;
      localStorage.setItem('darkMode', JSON.stringify(dark));
      applyDarkMode();
    });
  }
}
