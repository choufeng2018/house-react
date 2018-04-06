import {handleActions, createAction} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = '与宿管人员相关的action';
const showCreateModal = createAction(`${ID}设置是否显示创建人员的弹框`);
const postDorAdminAc = createFetchAction(`${SERVICE_API}/doradmin/postDorAdmin.php`, [], "POST");
const getDorAdminAc = createFetchAction(`${SERVICE_API}/doradmin/getDorAdmin.php`, [], "GET");
const isFresh = createAction(`${ID}是否刷新界面`);
const showCreateBatch = createAction(`${ID}是否显示批量创建人员的弹框`);
const showDeleteBatch = createAction(`${ID}是否显示批量删除人员的弹框`);
const deleteDorAdminAc = createFetchAction(`${SERVICE_API}/doradmin/deleteDorAdmin.php?doradmin_no={{doradmin_no}}`, [], "GET");
const saveDeleteData = createAction(`${ID}保存要删除的数据`);
const saveEditData = createAction(`${ID}保存要变更的数据`);
const showEditModal = createAction(`${ID}是否显示变更框`);
const editDataAc = createFetchAction(`${SERVICE_API}/doradmin/editDorAdmin.php?doradmin_no={{doradmin_no}}`, [], "POST");
export const actions = {
    showCreateModal,
    postDorAdminAc,
    getDorAdminAc,
    isFresh,
    deleteDorAdminAc,
    showCreateBatch,
    showDeleteBatch,
    saveDeleteData,
    saveEditData,
    showEditModal,
    editDataAc
}
export default handleActions({
    [showCreateModal]: (state, {payload}) => ({
        ...state,
        createModal: payload
    }),
    [isFresh]: (state, {payload}) => ({
        ...state,
        fresh: payload
    }),
    [showCreateBatch]: (state, {payload}) => ({
        ...state,
        createBatch: payload
    }),
    [showDeleteBatch]: (state, {payload}) => ({
        ...state,
        deleteBatch: payload
    }),
    [saveDeleteData]: (state, {payload}) => ({
        ...state,
        deleteData: payload
    }),
    [saveEditData]: (state, {payload}) => ({
        ...state,
        editData: payload
    }),
    [showEditModal]: (state, {payload}) => ({
        ...state,
        editShow: payload
    })
},{})
