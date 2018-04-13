import {handleActions, combineActions, createAction} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = '与留言有关的action';
const saveAdmin = createAction(`${ID}保存物业管理员信息`);
const setShowCreate = createAction(`${SERVICE_API}`);
const getAdmin = createFetchAction(`${SERVICE_API}/doradmin/getDorAdmin.php`, [saveAdmin], "GET");
const postMessage = createFetchAction(`${SERVICE_API}/message/postData.php`, [], 'POST');
const getMessage = createFetchAction(`${SERVICE_API}/message/getData.php?msg_send={{msg_send}}`, [], 'GET');
const deleteMessage = createFetchAction(`${SERVICE_API}/message/deleteData.php?msg_id={{msg_id}}`, [], 'GET');
const isFresh = createAction(`${ID}是否刷新界面`);
export const actions = {
    getAdmin,
    setShowCreate,
    postMessage,
    getMessage,
    isFresh,
    deleteMessage
}
export default handleActions({
    [saveAdmin]: (state, {payload}) => ({
        ...state,
        adminInfo: payload
    }),
    [setShowCreate]: (state, {payload}) => ({
        ...state,
        showCreate: payload
    }),
    [isFresh]: (state, {payload}) =>({
        ...state,
        fresh: payload
    })
},{})
