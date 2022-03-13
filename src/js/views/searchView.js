import icons from 'url:../../img/icons.svg';

import View from './View.js';

class SearchView extends View {
  _parentEl = document.querySelector('.search');
  _searchField = this._parentEl.querySelector('.search__field');
  _searchBtn = document.querySelector('.search__btn');

  getQuery() {
    const query = this._searchField.value;
    this._clearInputs();
    return query;
  }
  _clearInputs() {
    this._searchField.value = '';
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  //
  //
  _clear() {
    this._searchContainer.innerHTML = '';
  }
  //
}
export default new SearchView();
