import {createAction, handleActions} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = `与领用工具有关的action`;
const postData = createFetchAction(`${SERVICE_API}/receive/index.php`, [], 'POST');
const showCreate = createAction(`${ID}是否显示创建弹框`);
const getData = createFetchAction(`${SERVICE_API}/receive/getData.php`, [], 'GET');
const isFresh = createAction(`${ID}是否刷新界面`);
const deleteData = createFetchAction(`${SERVICE_API}/receive/deleteData.php?receive_name={{receive_name}}`, [], 'GET');
const saveDeleteData = createAction(`${ID}保存要删除的数据`);
const deleteShow = createAction(`${ID}显示批量删除弹框`);
export const actions = {
    postData,
    showCreate,
    getData,
    isFresh,
    deleteData,
    saveDeleteData,
    deleteShow
}
export default handleActions({
    [showCreate]: (state, {payload}) => ({
        ...state,
        createVisible: payload
    }),
    [isFresh]: (state, {payload}) => ({
        ...state,
        fresh: payload
    }),
    [saveDeleteData]: (state, {payload}) => ({
        ...state,
        deleteRows: payload
    }),
    [deleteShow]: (state, {payload}) => ({
        ...state,
        deleteVisible: payload
    })
},{})
