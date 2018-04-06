import {handleActions, combineActions} from 'redux-actions';
import {actionsMap} from '../../_platform/store/util';
// 导入新闻界面的store
import newsReducer, {actions as newsActions} from './news'
// 导入公告管理界面的store
import noticeReducer, {actions as noticeActions} from './notice'
export default handleActions({
    [combineActions(...actionsMap(newsActions))]: (state = {}, action) => ({
        ...state,
        news: newsReducer(state.news, action)
    }),
    [combineActions(...actionsMap(noticeActions))]: (state = {}, action) => ({
        ...state,
        notice: noticeReducer(state.notice, action)
    })
},{})
