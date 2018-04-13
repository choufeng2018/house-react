import {handleActions, combineActions, createAction} from 'redux-actions'
import {SERVICE_API} from '../../_platform/api';
import createFetchAction from './fetchAction';
const ID = '与评价有关的action'
const setShowEvalute = createAction(`${ID}显示评价详情`);
const getOrder = createFetchAction(`${SERVICE_API}/repair/getDataEvalute.php?person={{person}}`, [], 'GET');
const setEvalute = createFetchAction(`${SERVICE_API}/repair/setEvalute.php`, [], 'POST');
const saveEvaluteData = createAction(`${ID}保存要评价的数据`);
const isFresh = createAction(`${ID}是否刷新界面`);
export const actions = {
    setShowEvalute,
    getOrder,
    setEvalute,
    saveEvaluteData,
    isFresh
}
export default handleActions({
    [setShowEvalute]: (state, {payload}) => ({
        ...state,
        showEvalute: payload
    }),
    [saveEvaluteData]: (state, {payload}) => ({
        ...state,
        evaluteData: payload
    }),
    [isFresh]: (state, {payload}) => ({
        ...state,
        fresh: payload
    })
},{})
