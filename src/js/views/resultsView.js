//Import parent class
import View from './View.js';
import previewView from './previewView.js';

//Import icons
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found with the search word :( try something else!!';
    _defaultMessage = 'To render recipes type in some word to the search panel!';

    _generateMarkup() {
        return this._data.map(result => previewView.render(result, false)).join('');
    }
}

export default new ResultsView();