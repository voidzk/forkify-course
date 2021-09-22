import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View.js';
import { mark } from 'regenerator-runtime';

class PagiView extends View {
  _parentElement = document.querySelector('.pagination');

  _btn(where, curPage) {
    let ob =
      where === 'p' ? { i: 'prev', d: 'left' } : { i: 'next', d: 'right' };
    //
    let svg = ` <svg class="search__icon">
    <use href="${icons}#icon-arrow-${ob.d}"></use>
    </svg>`;
    //
    let span = `<span>Page ${curPage}</span>`;
    //
    return `
        <button data-goto="${curPage}" class="btn--inline 
        pagination__btn--${ob.i}">
          ${ob.i === 'prev' ? svg + span : span + svg}
        </button>
      `;
  }
  //
  //
  //
  //
  _generateMarkup() {
    let html = '';
    const n = this._data.numOfPages;
    for (let i = 1; i < n + 1; i++) {
      html += ` <button data-goto="${i}" class="btn--inline" style="display:inline" ${
        this._data.page === i ? 'disabled' : ''
      }>
          ${i}                      
         </button>`;
    }
    return html;
  }

  //
  //
  //
  //
  //
  // _generateMarkup() {
  //   console.log(this._data.numOfPages);
  //   const curPage = this._data.page;
  //   const numPages = Math.ceil(
  //     this._data.results.length / this._data.resultsPerPage
  //   );
  //   // PAGE 1 and the are other PAGES
  //   if (curPage === 1 && numPages > 1) {
  //     return this._btn('n', curPage + 1);
  //   }
  //   //LAST PAGE
  //   if (curPage === numPages && numPages > 1) {
  //     return this._btn('p', curPage - 1);
  //   }
  //   if (curPage < numPages) {
  //     return `${this._btn('p', curPage - 1)}
  //      ${this._btn('n', curPage + 1)}
  //     `;
  //   }
  //   return '';
  // }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PagiView();
