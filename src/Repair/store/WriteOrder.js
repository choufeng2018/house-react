import {createAction, handleActions, combineActions} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = '与报修单管理相关的action'
const setOrderEdit = createAction(`${ID}编辑报修单`);
const setWriteShow = createAction(`${ID}填写报修单显示`);
const setEditData = createAction(`${ID}存储变更的数据`);
const saveRepair = createAction(`${ID}存储获取的报修单信息`);
const getRepair = createFetchAction(`${SERVICE_API}/repair/getData.php`, [saveRepair], 'GET');
const postRepair = createFetchAction(`${SERVICE_API}/repair/index.php`, [], "POST");
const deleteRepair = createFetchAction(`${SERVICE_API}/repair/deleteData.php?code={{code}}`, [], "GET");
const putRepair = createFetchAction(`${SERVICE_API}/repair/putData.php`, [], "POST");
const isFresh = createAction(`${ID}是否刷新`);
export const actions = {
    setOrderEdit,
    setWriteShow,
    setEditData,
    getRepair,
    isFresh,
    postRepair,
    deleteRepair,
    putRepair,
    saveRepair
}
export default handleActions({
    [setOrderEdit]: (state, {payload}) => ({
        ...state,
        editData: payload
    }),
    [setWriteShow]: (state, {payload}) => ({
        ...state,
        showOrder: payload
    }),
    [setEditData]: (state, {payload}) => ({
        ...state,
        editData: payload
    }),
    [isFresh]: (state, {payload}) => ({
        ...state,
        fresh: payload
    }),
    [saveRepair]: (state, {payload}) => ({
        ...state,
        reapirOrder: payload
    })
},{})
