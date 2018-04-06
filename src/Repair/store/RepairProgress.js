import {createAction, handleActions, combineActions} from 'redux-actions'
const ID = '与维修进度有关的action'
const setProgressShow = createAction(`${ID}显示进度`)
export const actions = {
    setProgressShow
}
export default handleActions({
    [setProgressShow]: (state, {payload}) => ({
        ...state,
        progressShow: payload
    })
},{})
