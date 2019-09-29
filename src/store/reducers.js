import redux from "shri-mini-redux"; 
import { SET_SEARCH_PATH } from "./actionTypes";

const initialSearchStore = {
    path: '/',
}

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
}

export default redux.combineReducers({
    search,
})

