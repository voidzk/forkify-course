import icons from 'url:../../img/icons.svg';

import { Fraction } from 'fractional';
import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query , please try again!';
  _message = '';
  //
  //
  // _generateMarkup() {
  //   //*********** V 0.1
  //   // const resultList = this._data.map(this._generateMarkupPreview).join('');
  //   // return `<ul class="results"> ${resultList} </ul>`;
  //   //
  //   return this._data.map(this._generateMarkupPreview).join('');
  // }
  _generateMarkup() {
    // return this._data.map(result => previewView.render(result, false)).join('');
    return this._data.map(result => previewView._generateList(result)).join('');
  }

  //
  //
}
export default new ResultsView();
