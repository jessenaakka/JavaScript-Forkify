//Import parent class
import View from './View.js';
import previewView from './previewView.js';

//Import icons
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. FInd a nice recipe and bookmark it!';
    _defaultMessage = 'To render recipes type in some word to the search panel!';

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    };

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    };
}

export default new BookmarkView();