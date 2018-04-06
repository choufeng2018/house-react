import {createAction, handleActions} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = '与主页有关的action';
const saveNews = createAction(`${ID}保存获取的新闻`);
const getNews = createFetchAction(`${SERVICE_API}/news/getData.php`, [saveNews], "GET");
const getNotice = createFetchAction(`${SERVICE_API}/notice/getData.php`, [], "GET");
export const actions = {
    getNews,
    getNotice
}
export default handleActions({
    [saveNews]: (state, {payload}) => ({
        ...state,
        news: payload
    })
},{})
