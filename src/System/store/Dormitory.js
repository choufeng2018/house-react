import {createAction, handleActions} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = '与宿舍有关的actions';
const getBuilding = createFetchAction(`${SERVICE_API}/building/getDormitory.php`, [], 'GET')
const saveBuilding = createAction(`${ID}保存当前点击的节点`);
const showCreateDor = createAction(`${ID}是否显示创建宿舍的弹框`);
const is_fresh = createAction(`${ID}是否刷新创建宿舍的界面`);
const postDormitory = createFetchAction(`${SERVICE_API}/dormitory/postDormitory.php`, [], "POST");
const getDormitoryAc = createFetchAction(`${SERVICE_API}/dormitory/getDormitory.php/?buil_no={{buil_no}}`, [], 'GET');
const saveDormitory = createAction(`${ID}保存当前点击的节点1`);
const deleteDormitory = createFetchAction(`${SERVICE_API}/dormitory/deleteDormitory.php/?dor_no={{dor_no}}`, [], "GET");
const saveEditData = createAction(`${ID}保存要编辑的数据`);
const showEditModal = createAction(`${ID}是否显示编辑弹框`);
const editModalAc = createFetchAction(`${SERVICE_API}/dormitory/editDormitory.php/`, [], 'POST');
export const actions = {
    getBuilding,
    saveBuilding,
    showCreateDor,
    is_fresh,
    postDormitory,
    getDormitoryAc,
    saveDormitory,
    deleteDormitory,
    saveEditData,
    showEditModal,
    editModalAc
}
export default handleActions({
    [saveBuilding]: (state, {payload}) => ({
        ...state,
        selectNode: payload
    }),
    [showCreateDor]: (state, {payload}) => ({
        ...state,
        createDormitory: payload
    }),
    [is_fresh]: (state, {payload}) => ({
        ...state,
        fresh: payload
    }),
    [saveDormitory]: (state, {payload}) => ({
        ...state,
        node: payload
    }),
    [saveEditData]: (state, {payload}) => ({
        ...state,
        editData: payload
    }),
    [showEditModal]: (state, {payload}) => ({
        ...state,
        editModal: payload
    })
},{})
