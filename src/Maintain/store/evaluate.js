import {createAction, handleActions, combineActions} from 'redux-actions'
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = '与查看评价有关的action'
const setProgressShow = createAction(`${ID}查看评价`);
const getRepair = createFetchAction(`${SERVICE_API}/repair/getDataEvaByReceive.php?receive={{receive}}`, [], 'GET');
const saveEvaluteData = createAction(`${ID}保存评价的数据`);
const setShowEvalute = createAction(`${ID}是否显示评价`);
export const actions = {
    setProgressShow,
    getRepair,
    saveEvaluteData,
    setShowEvalute
}
export default handleActions({
    [setProgressShow]: (state, {payload}) => ({
        ...state,
        evaluateShow: payload
    }),
    [saveEvaluteData]: (state, {payload}) => ({
        ...state,
        evaluteData: payload
    }),
    [setShowEvalute]: (state, {payload}) => ({
        ...state,
        visible: payload
    })
},{})
