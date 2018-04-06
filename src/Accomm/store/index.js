import {combineActions, handleActions} from 'redux-actions'
import {actionsMap} from '../../_platform/store/util'
import createDistriReducer, {actions as createDistriActions} from './createDistri';
export default handleActions({
    [combineActions(...actionsMap(createDistriActions))]: (state, action) => ({
        ...state,
        createDistri: createDistriReducer(state.createDistri, action)
    })
},{})
