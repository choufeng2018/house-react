import {combineActions, handleActions} from 'redux-actions';
import {actionsMap} from '../../_platform/store/util';
import receiveReducer, {actions as receiveActions} from './receive'
// 导出reducer
export default handleActions({
    [combineActions(...actionsMap(receiveActions))]: (state = {}, action) => ({
        ...state,
        receive: receiveReducer(state.receive, action)
    })
},{})
