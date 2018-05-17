import {createAction, handleActions} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = `与外出物品有关的action`;
const postData = createFetchAction(`${SERVICE_API}/goods/index.php`, [], 'POST');
const showCreate = createAction(`${ID}是否显示创建弹框`);
// createAction(`${ID}是否显示创建弹框`)返回的是一个匿名的函数
// (...args) => {
//      const action = {
//       type,
//       payload: finalActionCreator(...args)
//     };
//     /**
//      * 如果给匿名函数传递参数的长度为1个,或者第一个参数元素的类型为Error,那么这么action的error属性为true
//      */
//     if (args.length === 1 && args[0] instanceof Error) {
//       // Handle FSA errors where the payload is an Error object. Set error.
//       action.error = true;
//     }
       /**
      * 传递到action里面的函数
      */
//     if (typeof metaCreator === 'function') {
//       action.meta = metaCreator(...args);
//     }
//     return action;
// }
// 将这个匿名函数赋给了一个变量showCreate
// 当showCreate被调用时，再次返回的值就是一个action
const getData = createFetchAction(`${SERVICE_API}/goods/getData.php`, [], 'GET');
const isFresh = createAction(`${ID}是否刷新界面`);
const deleteData = createFetchAction(`${SERVICE_API}/goods/deleteData.php?goods_name={{goods_name}}`, [], 'GET');
export const actions = {
    postData,
    showCreate,
    getData,
    isFresh,
    deleteData
}
// handleActions第一个参数handler,第二个参数defaultState
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
