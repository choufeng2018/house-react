import {combineActions, handleActions} from 'redux-actions';
import {actionsMap} from '../../_platform/store/util';
import receiveReducer, {actions as receiveActions} from './receive';
import progressReducer, {actions as progressActions} from './setprogress';
import evaluateReducer, {actions as evaluateActions} from './evaluate';
// 导出reducer
export default handleActions({
    [combineActions(...actionsMap(receiveActions))]: (state = {}, action) => ({
        ...state,
        receive: receiveReducer(state.receive, action)
    }),
    [combineActions(...actionsMap(progressActions))]: (state = {}, action) => ({
        ...state,
        progress: progressReducer(state.progress, action)
    }),
    [combineActions(...actionsMap(evaluateActions))]: (state = {}, action) => ({
        ...state,
        evaluate: evaluateReducer(state.evaluate, action)
    })
},{})
