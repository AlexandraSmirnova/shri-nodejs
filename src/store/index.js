import redux from 'shri-mini-redux';
import rootReducer from "./reducers";

const store = new redux.Store(rootReducer);

export default store;