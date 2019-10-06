'use strict';

const combineReducers = (reducersMap) => {
    return (state = {}, action) => {
        const nextState = {};
        Object.entries(reducersMap).forEach(([key, reducer]) => {
            nextState[key] = reducer(state[key], action);
        });
        return nextState
    }
};

class Store {
    constructor(reducer) {
        this._reducer = reducer;
        this._state = undefined;
        this._listeners = [];
        this.dispatch({
            type: '@@init'
        });
    }

    getState() {
        return this._state;
    }

    subscribe(subscriber) {
        this._listeners.push(subscriber);
        return () => {
            const index = this._listeners.indexOf(subscriber);
            this._listeners.splice(index, 1);
        };
    }

    dispatch(action) {
        console.log('action', action);
        this._state = this._reducer(this._state, action);
        this._notifyListeners();
    }

    _notifyListeners() {
        this._listeners.forEach((listener) => {
            listener(this._state);
        });
    }
}

class View {
    constructor(el, store) {
        this._el = el;
        this._store = store;
        this._unsubscribe = store.subscribe(
            this._prepareRender.bind(this)
        );
        this._prepareRender(store.getState());
    }

    _prepareRender(state) {
        this._el.innerHTML = this.render(state);
    }

    render() {
        throw new Error('This method should be overriden');
    }

    distroy() {
        this._el.innerHTML = '';
        this._unsubscribe();
    }
}

var index = {
    combineReducers,
    Store,
    View,
};

class BreadcrumbsView extends index.View {
    render({ search }) {
        const items = search.path
            .split('/')
            .filter((item) => item); // фильтр пустых строк ""

        const itemsString = items.map(
            (item, index) => index === items.length - 1 
                ? `<div class="Breadcrumbs-Item Breadcrumbs-Item_state_open">
                        <div class="Text Text_size_s Tex_weight_l">${item}</div>
                    </div>`
                : `<div class="Breadcrumbs-Item">
                    <div class="Text Text_size_s">${item}</div>    
                </div>`
        )
        .join('');

        return `
            <div class="Breadcrumbs">
                ${itemsString}
            </div>
        `;
    }
}

const SET_SEARCH_PATH = 'SET_SEARCH_PATH';

const setSearchPath = (path) => ({ type: SET_SEARCH_PATH, payload: path });

class SearchView extends index.View {
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

const initialSearchStore = {
    path: '/',
};

const search = (state = initialSearchStore, action) => {
    console.log('reducer', action);
    switch (action.type) {
        case SET_SEARCH_PATH:
            return {
                ...state,
                path: action.payload,
            }
        default:
            return state;
    }
};

var rootReducer = index.combineReducers({
    search,
});

const store = new index.Store(rootReducer);

const searchEl = document.getElementById('searchInput');
new SearchView(searchEl, store);

const breadcrumbsEl = document.getElementById('breadcrumbs');
new BreadcrumbsView(breadcrumbsEl, store);
