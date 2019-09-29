import redux from 'shri-mini-redux';
import { setSearchPath } from '../../store/actions';

class SearchView extends redux.View {
    constructor(el, store) {
        super(el, store);
        this._onInput = this._onInput.bind(this);
        this._el.addEventListener('change', this._onInput);
    }

    _onInput(event) {
        this._store.dispatch(setSearchPath(event.target.value));
    }

    destroy() {
        super.destroy();
        this._el.removeEventListener('change', this._onInput);
    }

    render({ search }) {
        return `
            <div class="Text Text_size_m">Введите путь до директории</div>
            <input value="${search.path}">
        `;
    }
}

export default SearchView;