import {handleActions, createAction} from 'redux-actions';
import {SERVICE_API} from '../../_platform/api';
import createFetchAction from './fetchAction';
const ID = '与维修人员有关的action';
const isFresh = createAction(`${ID}是否刷新界面`);
const postRepman = createFetchAction(`${SERVICE_API}/repairMan/index.php`, [], "POST");
const getRepman = createFetchAction(`${SERVICE_API}/repairMan/getData.php`, [], "GET");
const deleteRepman = createFetchAction(`${SERVICE_API}/repairMan/deleteData.php?repman_no={{repman_no}}`, [], "GET");
const putRepman = createFetchAction(`${SERVICE_API}/repairMan/putData.php`, [], 'POST');
const saveEditData = createAction(`${ID}保存要编辑的数据`);
const setCreateShow = createAction(`${ID}是否显示创建弹框`);
const setCreateBatch = createAction(`${ID}是否显示批量创建的弹框`);
const setDeleteBatch = createAction(`${ID}是否显示批量删除的弹框`);
const saveDeleteData = createAction(`${ID}保存要删除的数据`);
export const actions = {
    isFresh,
    postRepman,
    setCreateShow,
    getRepman,
    deleteRepman,
    saveEditData,
    putRepman,
    setCreateBatch,
    setDeleteBatch,
    saveDeleteData
}
export default handleActions({
    [isFresh]: (state, {payload}) => ({
        ...state,
        fresh: payload
    }),
    [setCreateShow]: (state, {payload}) => ({
        ...state,
        createShow: payload
    }),
    [saveEditData]: (state, {payload}) => ({
        ...state,
        editData: payload
    }),
    [setCreateBatch]: (state, {payload}) => ({
        ...state,
        batchShow: payload
    }),
    [setDeleteBatch]: (state, {payload}) => ({
        ...state,
        batchDelete: payload
    }),
    [saveDeleteData]: (state, {payload}) => ({
        ...state,
        deleteData: payload
    })
},{})
