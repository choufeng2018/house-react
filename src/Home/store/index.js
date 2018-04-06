import {handleActions, combineActions} from 'redux-actions';
import {actionsMap} from '../../_platform/store/util';
import homeReducer, {actions as homeActions} from './home';
export default handleActions({
    [combineActions(...actionsMap(homeActions))]: (state, action) => ({
        ...state,
        home: homeReducer(state.home, action)
    })
},{})
