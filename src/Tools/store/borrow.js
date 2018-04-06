import {createAction, handleActions} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = `与借用工具有关的action`;
const postData = createFetchAction(`${SERVICE_API}/borrow/index.php`, [], 'POST');
const showCreate = createAction(`${ID}是否显示创建弹框`);
const getData = createFetchAction(`${SERVICE_API}/borrow/getData.php`, [], 'GET');
const isFresh = createAction(`${ID}是否刷新界面`);
const deleteData = createFetchAction(`${SERVICE_API}/borrow/deleteData.php?borrow_name={{borrow_name}}`, [], 'GET');
export const actions = {
    postData,
    showCreate,
    getData,
    isFresh,
    deleteData
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
},{})
