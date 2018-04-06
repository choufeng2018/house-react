import {handleActions, combineActions, createAction} from 'redux-actions'
const ID = '与评价有关的action'
const setShowEvalute = createAction(`${ID}显示评价详情`);
export const actions = {
    setShowEvalute
}
export default handleActions({
    [setShowEvalute]: (state, {payload}) => ({
        ...state,
        showEvalute: payload
    })
},{})
