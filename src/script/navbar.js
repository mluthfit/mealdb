window.addEventListener('DOMContentLoaded', () => {
  const filterButton = document.querySelector('.filter > button');
  const filterBox = document.querySelector('.filter-box');
  filterButton.addEventListener('click', () => {
    if (filterBox.style.display === 'block') {
      filterBox.style.display = 'none';
    } else {
      filterBox.style.display = 'block';
    }
  });
});
