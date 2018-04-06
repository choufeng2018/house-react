import {handleActions, createAction} from 'redux-actions'
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api'
const ID = `与创建宿舍有关的action`;
const setCreateShow = createAction(`${ID}是否显示创建宿舍楼界面`);
const setCreateDormShow = createAction(`${ID}是否显示创建宿舍号界面`);
const setDorState = createAction(`${ID}存储当前点击的类别`)
const postBuilding = createFetchAction(`${SERVICE_API}/building/index.php`, [], 'POST')
const getBuildingAc = createAction(`${ID}保存请求回来的数据`)
const getBuilding = createFetchAction(`${SERVICE_API}/building/getDormitory.php`, [getBuildingAc], 'GET')
const saveNode = createAction(`${ID}保存点击的数据`);
const is_fresh = createAction(`${ID}是否刷新界面`);
const deleteBuilding = createFetchAction(`${SERVICE_API}/building/deleteDormitory.php/?buil_no={{buil_no}}&time={{time}}`, [], 'GET')
const editBuilding = createFetchAction(`${SERVICE_API}/building/editDormitory.php/?buil_no={{buil_no}}`, [], 'POST');
const saveEditData = createAction(`${ID}保存要编辑的数据`);
const showEditModal = createAction(`${ID}是否显示编辑弹框`);
const saveDorMadin = createAction(`${ID}保存宿管信息`);
const getDorAdminAc = createFetchAction(`${SERVICE_API}/doradmin/getDorAdmin.php`, [saveDorMadin], "GET");
export const actions = {
    setCreateShow,
    setCreateDormShow,
    setDorState,
    postBuilding,
    getBuilding,
    saveNode,
    is_fresh,
    deleteBuilding,
    editBuilding,
    saveEditData,
    showEditModal,
    getDorAdminAc,
    saveDorMadin
}
export default handleActions({
    [setCreateShow]: (state, {payload}) => ({
        ...state,
        createShow: payload
    }),
    [setCreateDormShow]: (state, {payload}) => ({
        ...state,
        createDormShow: payload
    }),
    [setDorState]: (state, {payload}) => ({
        ...state,
        dorState: payload
    }),
    [getBuildingAc]: (state, {payload}) => ({
        ...state,
        buildTree: payload
    }),
    [saveNode]: (state, {payload}) => ({
        ...state,
        node: payload
    }),
    [is_fresh]: (state, {payload}) => ({
        ...state,
        fresh: payload
    }),
    [saveEditData]: (state, {payload}) => ({
        ...state,
        editData: payload
    }),
    [showEditModal]: (state, {payload}) => ({
        ...state,
        editModal: payload
    }),
    [saveDorMadin]: (state, {payload}) => ({
        ...state,
        dorAdmin: payload
    })
},{})
