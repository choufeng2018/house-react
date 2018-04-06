import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux'
import platformReducer, {actions} from './_platform/store/global';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const composeEnhancers = composeWithDevTools({
	// options like actionSanitizer, stateSanitizer
});

const {changeLocation} = actions;
const history = createHistory();
const initialState = window.___INITIAL_STATE__;
//console.log('init state',window.___INITIAL_STATE__);
const middleware = [thunk, routerMiddleware(history)];
const enhancers = [];

const makeRootReducer = (asyncReducers) => {
	return combineReducers({
		platform: platformReducer,
		...asyncReducers
	});
};

const store = createStore(
	makeRootReducer({}),
	initialState,
	composeEnhancers(
		compose(
			applyMiddleware(...middleware),
			...enhancers
		)
	)
);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
	store.asyncReducers[key] = reducer;
	store.replaceReducer(makeRootReducer(store.asyncReducers));
};

const unlisten = history.listen((nextLocation) => {
	store.dispatch(changeLocation(nextLocation));
});

export default store;
