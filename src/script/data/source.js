const axios = require('axios');

class DataSource {
  static allCategories() {
    return axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((responseJson) => responseJson.data);
  }

  static allAreas() {
    return axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((responseJson) => responseJson.data);
  }

  static getMealByName(keyword) {
    return axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then((responseJson) => {
        if (responseJson.data.meals !== null) {
          return Promise.resolve(responseJson.data.meals);
        }

        return Promise.reject(`${keyword} is not found!`);
      });
  }

  static getMealById(idMeal) {
    return axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((responseJson) => responseJson.data.meals);
  }

  static getMealByCategory(keyword) {
    return axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${keyword}`)
      .then((responseJson) => {
        if (responseJson.data.meals !== null) {
          return Promise.resolve(responseJson.data.meals);
        }

        return Promise.reject(`Category named ${keyword} is not found!`);
      });
  }

  static getMealByArea(keyword) {
    return axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${keyword}`)
      .then((responseJson) => {
        if (responseJson.data.meals !== null) {
          return Promise.resolve(responseJson.data.meals);
        }

        return Promise.reject(`Area named ${keyword} is not found!`);
      });
  }
}

export default DataSource;
