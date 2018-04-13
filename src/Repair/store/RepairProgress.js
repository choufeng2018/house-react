import {createAction, handleActions, combineActions} from 'redux-actions'
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = '与维修进度有关的action'
const setProgressShow = createAction(`${ID}显示进度`);
const getRepair = createFetchAction(`${SERVICE_API}/repair/getDataByperson.php?person={{person}}`, [], 'GET');
const saveProgressData = createAction(`${ID}保存要查看进度的数据`);
export const actions = {
    setProgressShow,
    getRepair,
    saveProgressData
}
export default handleActions({
    [setProgressShow]: (state, {payload}) => ({
        ...state,
        progressShow: payload
    }),
    [saveProgressData]: (state, {payload}) => ({
        ...state,
        progressData: payload
    })
},{})
