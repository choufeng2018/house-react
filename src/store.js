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
const middleware = [thunk, routerMiddleware(history)];
const enhancers = [];
const makeRootReducer = (asyncReducers) => {
	return combineReducers({
		platform: platformReducer,
		...asyncReducers
	});
};
// createStore传入三个参数参数(reducer, 初始的state,)
export const store = createStore(
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
	// Object.hasOwnProperty() 判断某个对象是否有某个属性值
	// Object.hasOwnProperty.call(store.asyncReducers, key) 使用call来改变this的指向，判断store.asyncReducers这个对象中是否有key这个属性名
	// 假如已经存在就结束，假如不存在就继续赋值
	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
	store.asyncReducers[key] = reducer;
	store.replaceReducer(makeRootReducer(store.asyncReducers));
};

const unlisten = history.listen((nextLocation) => {
	store.dispatch(changeLocation(nextLocation));
});

export default store;
