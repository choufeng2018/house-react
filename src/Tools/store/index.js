import {combineActions, handleActions} from 'redux-actions'
import {actionsMap} from '../../_platform/store/util'
import borrowReducer, {actions as borrowActions} from './borrow';
import receiveReducer, {actions as receiveActions} from './receive';
export default handleActions({
    [combineActions(...actionsMap(borrowActions))]: (state, action) => ({
        ...state,
        borrow: borrowReducer(state.borrow, action)
    }),
    [combineActions(...actionsMap(receiveActions))]: (state, action) => ({
        ...state,
        receive: receiveReducer(state.receive, action)
    })
},{})
