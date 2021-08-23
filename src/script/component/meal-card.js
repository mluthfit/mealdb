class MealCard extends HTMLElement {
  set meal(meal) {
    this._meal = meal;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.classList.add('card');
    this.innerHTML = `
      <img src="${this._meal.strMealThumb}" alt="${this._meal.strMeal}">
      <div class="details">
        <h2>${this._meal.strMeal}</h2>
        <div class="category-name">
          <strong>Category : </strong>
          <span>${this._meal.strCategory}</span>
        </div>
        <div class="area-name">
          <strong>Area : </strong>
          <span>${this._meal.strArea}</span>
        </div>
        <div class="ingredients">
          <span>
            <strong>Ingredients</strong>
          </span>
          <div class="ingredient-list">
          </div>
        </div>
        <div class="video">
          <strong>Video Tutorial : </strong>
          <span>
            <a href="${this._meal.strYoutube}" target="_blank">YouTube</a>
          </span>
        </div>
      </div>
    `;
    this.renderIngredient();
  }

  renderIngredient() {
    const ingredientListContainer = this.querySelector('.ingredient-list');
    ingredientListContainer.innerHTML = '';

    let count = 1;
    let ingredient = this._meal[`strIngredient${count}`];
    while (ingredient !== '' && ingredient !== undefined && ingredient !== null) {
      const measure = this._meal[`strMeasure${count}`];
      ingredientListContainer.innerHTML += `
        <span>${count}. ${ingredient} ${measure}</span>
      `;

      count += 1;
      ingredient = this._meal[`strIngredient${count}`];
    }
  }
}

customElements.define('meal-card', MealCard);
