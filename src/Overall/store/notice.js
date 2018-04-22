import { createAction, handleActions, combineActions } from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = `公告相关action`;
const setNoticeShow = createAction(`创建公告弹框是否显示`);
const setNoticeDetail = createAction(`${ID}公告详情页面是否显示`);
const setNoticeContent = createAction(`${ID}公告详情`);
const setNoticeData = createAction(`${ID}公告数据`);
const isFresh = createAction(`${ID}是否刷新界面`);
const postNotice = createFetchAction(`${SERVICE_API}/notice/index.php`, [], 'POST');
const getNotice = createFetchAction(`${SERVICE_API}/notice/getData.php`, [], 'GET');
const deleteNotice = createFetchAction(`${SERVICE_API}/notice/deleteData.php?id={{id}}`, [], 'GET');
const putNotice = createFetchAction(`${SERVICE_API}/notice/putData.php`, [], 'POST');
export const actions = {
    setNoticeShow,
    setNoticeDetail,
    setNoticeContent,
    setNoticeData,
    isFresh,
    postNotice,
    getNotice,
    deleteNotice,
    putNotice
}
export default handleActions({
    [setNoticeShow]: (state, {payload}) => ({
        ...state,
        notice_visible: payload
    }),
    [setNoticeContent]: (state, {payload}) => ({
        ...state,
        notice_content: payload
    }),
    [setNoticeDetail]: (state, {payload}) => ({
        ...state,
        notice_detail: payload
    }),
    [setNoticeData]: (state, {payload}) => ({
        ...state,
        notice_data: payload
    }),
    [isFresh]: (state, {payload}) => ({
        ...state,
        fresh: payload
    })
},{})
