import {combineActions, handleActions} from 'redux-actions';
import {actionsMap} from '../../_platform/store/util';

import WriteOrderReducer, {actions as WriteOrderActions} from './WriteOrder'
import RepairProgressReducer, {actions as RepairProgressActions} from './RepairProgress'
import RepairEvaluteReducer, {actions as RepairEvaluteActons} from './RepairEvalute'
import AcceptOrderReducer, {actions as AcceptOrderActions} from './AcceptOrder'
// 导出reducer
export default handleActions({
    [combineActions(...actionsMap(WriteOrderActions))]: (state = {}, action) => ({
        ...state,
        writeOrder: WriteOrderReducer(state.writeOrder, action)
    }),
    [combineActions(...actionsMap(RepairProgressActions))]: (state = {}, action) => ({
        ...state,
        repairProgress: RepairProgressReducer(state.repairProgress, action)
    }),
    [combineActions(...actionsMap(RepairEvaluteActons))]: (state = {}, action) => ({
        ...state,
        repairEvalute: RepairEvaluteReducer(state.repairEvalute, action)
    }),
    [combineActions(...actionsMap(AcceptOrderActions))]: (state = {}, action) => ({
        ...state,
        acceptOrder: AcceptOrderReducer(state.acceptOrder, action)
    })
},{})
