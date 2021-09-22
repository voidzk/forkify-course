import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'no bookmarks yet , bookmark to start view';
  _message = '';
  //
  //
  //   _generateMarkup() {
  //     return this._data
  //       .map(bookmark => previewView.render(bookmark, false))
  //       .join('');
  //   }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView._generateList(bookmark))
      .join('');
  }
}
export default new BookmarksView();
