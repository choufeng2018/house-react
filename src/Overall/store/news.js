import { createAction, handleActions, combineActions } from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = "新闻管理相关action";
const setNewsShow = createAction(`${ID}新闻发布页面是否显示`);
const setNewsContent = createAction(`${ID}新闻详情`);
const setNewsDetail = createAction(`${ID}新闻详情页面是否显示`);
const setOpertion = createAction(`${ID}判断是编辑还是新增`);
const setEditData = createAction(`${ID}存储编辑的信息`);
const postNews = createFetchAction(`${SERVICE_API}/news/index.php`, [], 'POST');
const getNews = createFetchAction(`${SERVICE_API}/news/getData.php`, [], 'GET');
const deleteNews = createFetchAction(`${SERVICE_API}/news/deleteData.php?news_title={{news_title}}`, [], 'GET');
const putNews = createFetchAction(`${SERVICE_API}/news/putData.php`, [], 'POST');
const isFresh = createAction(`${ID}是否刷新界面`);
export const actions = {
    setNewsShow,
    setNewsContent,
    setNewsDetail,
    setOpertion,
    setEditData,
    postNews,
    getNews,
    isFresh,
    deleteNews,
    putNews
}
export default handleActions({
    [setNewsShow]: (state, {payload}) => ({
        ...state,
        news_visible: payload
    }),
    [setNewsContent]: (state, {payload}) => ({
        ...state,
        news_content: payload
    }),
    [setNewsDetail]: (state, {payload}) => ({
        ...state,
        news_detail: payload
    }),
    [setOpertion]: (state, {payload}) => ({
        ...state,
        opertion: payload
    }),
    [setEditData]: (state, {payload}) => ({
        ...state,
        editData: payload
    }),
    [isFresh]: (state, {payload}) => ({
        ...state,
        fresh: payload
    })
},{})
