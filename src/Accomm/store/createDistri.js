import {createAction, handleActions} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = `与分配宿舍有关的action`;
const getBuilding = createFetchAction(`${SERVICE_API}/building/getDormitory.php`, [], 'GET')
const saveBuilding = createAction(`${ID}保存当前点击的节点`);
const showDistriDor = createAction(`${ID}是否显示创建宿舍的弹框`);
const is_fresh = createAction(`${ID}是否刷新创建宿舍的界面`);
const postDistri = createFetchAction(`${SERVICE_API}/owner/index.php`, [], "POST");
const putDistri = createFetchAction(`${SERVICE_API}/owner/putData.php`, [], "POST");
const getDormitoryAc = createFetchAction(`${SERVICE_API}/dormitory/getDormitory.php/?buil_no={{buil_no}}`, [], 'GET');
const saveDormitory = createAction(`${ID}保存当前点击的节点1`);
const deleteDormitory = createFetchAction(`${SERVICE_API}/dormitory/deleteDormitory.php/?dor_no={{dor_no}}`, [], "GET");
const saveEditData = createAction(`${ID}保存要编辑的数据`);
const showEditModal = createAction(`${ID}是否显示编辑弹框`);
const editModalAc = createFetchAction(`${SERVICE_API}/dormitory/editDormitory.php/`, [], 'POST');
const getStudent = createFetchAction(`${SERVICE_API}/distri/getStudent.php/`, [], "GET");
const getDistri = createFetchAction(`${SERVICE_API}/owner/getData.php?owner_house={{owner_house}}`, [], "GET");
const deleteDistri = createFetchAction(`${SERVICE_API}/owner/deleteData.php/?owner_no={{owner_no}}`, [], "GET");
const saveDistriData = createAction(`${ID}保存某个宿舍的入住详情`);
const saveSpinStatus = createAction(`${ID}保存spin框的状态`);
const getOwnerAll = createFetchAction(`${SERVICE_API}/owner/getOwnerAll.php`, [], "GET")
const getOwnerByName = createFetchAction(`${SERVICE_API}/owner/getDataByName.php/?user_name={{user_name}}`, [], "GET");
export const actions = {
    getBuilding,
    saveBuilding,
    showDistriDor,
    is_fresh,
    postDistri,
    getDormitoryAc,
    saveDormitory,
    deleteDormitory,
    saveEditData,
    showEditModal,
    editModalAc,
    getStudent,
    getDistri,
    deleteDistri,
    saveDistriData,
    saveSpinStatus,
    putDistri,
    getOwnerAll,
    getOwnerByName
}
export default handleActions({
    [saveBuilding]: (state, {payload}) => ({
        ...state,
        selectNode: payload
    }),
    [showDistriDor]: (state, {payload}) => ({
        ...state,
        distriDor: payload
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
    }),
    [saveDistriData]: (state, {payload}) => ({
        ...state,
        distriData: payload
    }),
    [saveSpinStatus]: (state, {payload}) => ({
        ...state,
        spinStatus: payload
    }),

},{})
