import {createAction, handleActions, combineActions} from 'redux-actions';
import createFetchAction from './fetchAction';
import {LOGIN_API, SERVICE_API} from '../../_platform/api';
import {actionsMap} from '../../_platform/store/util'
// 是个方法，里面封装的是payload构造器
import fieldFactory from '../../_platform/store/field'
const ID = "LOGIN_USER";
const getLogin = createFetchAction(`${LOGIN_API}/index.php/?user_name={{user_name}}&user_pass={{user_pass}}`, [], 'GET')
const fieldReducer = fieldFactory(ID, 'addition');
const getPermission = createFetchAction(`${SERVICE_API}/permission/getData.php?perm_name={{perm_name}}`, [], "GET");
const setVisit = createFetchAction(`${SERVICE_API}/visit/setVisit.php?visit_time={{visit_time}}`, [], 'GET');
export const actions = {
    ...fieldReducer,
    getLogin,
    getPermission,
    setVisit
}
export default handleActions({
	[combineActions(...actionsMap(fieldReducer))]: (state, action) => ({
		...state,
		userInfo: fieldReducer(state.userInfo, action),
	}),
}, {});
