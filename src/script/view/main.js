import '../component/filter-list.js';
import '../component/meal-card.js';
import '../../style/style.css';
import DataSource from '../data/source.js';

const main = () => {
  // Execute event while button was clicked
  // This event will be generate all meals by categories or areas
  const categoryClicked = async function () {
    const cardListContainer = document.querySelector('.card-list');
    cardListContainer.innerHTML = '';
    try {
      const mealCategory = await DataSource.getMealByCategory(this.innerHTML);

      mealCategory.forEach(async (category) => {
        const mealId = await DataSource.getMealById(category.idMeal);
        const mealCardTag = document.createElement('meal-card');
        [mealCardTag.meal] = mealId;
        cardListContainer.appendChild(mealCardTag);
      });
    } catch (message) {
      cardListContainer.innerHTML = `
        <div class="error">
          <span>${message}</span>
        </div>
      `;
    }
  };

  const areaClicked = async function () {
    const cardListContainer = document.querySelector('.card-list');
    cardListContainer.innerHTML = '';
    try {
      const mealArea = await DataSource.getMealByArea(this.innerHTML);

      mealArea.forEach(async (category) => {
        const mealId = await DataSource.getMealById(category.idMeal);
        const mealCardTag = document.createElement('meal-card');
        [mealCardTag.meal] = mealId;
        cardListContainer.appendChild(mealCardTag);
      });
    } catch (message) {
      cardListContainer.innerHTML = `
        <div class="error">
          <span>${message}</span>
        </div>
      `;
    }
  };

  // Used custom element named 'filter-list'
  // Generate all categories from themealdb.com
  const categoryTemplate = async () => {
    try {
      const categoryData = await DataSource.allCategories();
      const categoryContainer = document.querySelector('.category');
      const filterListTag = document.createElement('filter-list');

      const items = {
        db: categoryData.meals,
        class: 'category-list',
        data: 'strCategory',
        clicked: categoryClicked,
      };

      filterListTag.items = items;
      categoryContainer.appendChild(filterListTag);
    } catch (message) {
      alert(message);
    }
  };

  // Generate all areas from themealdb.com
  const areaTemplate = async () => {
    try {
      const areaData = await DataSource.allAreas();
      const areaContainer = document.querySelector('.area');
      const filterListTag = document.createElement('filter-list');

      const items = {
        db: areaData.meals,
        class: 'area-list',
        data: 'strArea',
        clicked: areaClicked,
      };

      filterListTag.items = items;
      areaContainer.appendChild(filterListTag);
    } catch (message) {
      alert(message);
    }
  };

  // Will be genereted all meals by name
  // And this function will execute after DOMCOntent Loaded
  const getMealsByName = async (keyword = '') => {
    const cardListContainer = document.querySelector('.card-list');
    cardListContainer.innerHTML = '';
    try {
      const mealData = await DataSource.getMealByName(keyword);

      mealData.forEach((meal) => {
        const mealCardTag = document.createElement('meal-card');
        mealCardTag.meal = meal;
        cardListContainer.appendChild(mealCardTag);
      });
    } catch (message) {
      cardListContainer.innerHTML = `
        <div class="error">
          <span>${message}</span>
        </div>
      `;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    categoryTemplate();
    areaTemplate();
    getMealsByName();

    const searchButton = document.querySelector('.search > button');
    searchButton.addEventListener('click', () => {
      const searchInput = document.querySelector('#search-input');
      getMealsByName(searchInput.value);
      searchInput.value = '';
    });
  });
};

export default main;
