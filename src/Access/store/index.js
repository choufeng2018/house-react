import {combineActions, handleActions} from 'redux-actions'
import {actionsMap} from '../../_platform/store/util'
// visitReducer是一个函数传两个参数(state和action)
import visitReducer, {actions as visitActions} from './visit';
import goodsReducer, {actions as goodsActions} from './goods';
export default handleActions({
    [combineActions(...actionsMap(visitActions))]: (state, action) => ({
        ...state,
        visit: visitReducer(state.visit, action)
    }),
    [combineActions(...actionsMap(goodsActions))]: (state, action) => ({
        ...state,
        goods: goodsReducer(state.goods, action)
    })
},{})
