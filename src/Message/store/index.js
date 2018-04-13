import {handleActions, combineActions, createAction} from 'redux-actions';
import {actionsMap} from '../../_platform/store/util';
import msgReducer, {actions as msgActions} from './msgManage';
// 导出reducer
export default handleActions({
    [combineActions(...actionsMap(msgActions))]: (state = {}, action) => ({
        ...state,
        msg: msgReducer(state.msg, action)
    }),
},{})
