import {handleActions, combineActions, createAction} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = '与接单有关的action'
const setAcceptShow = createAction(`${ID}是否显示接单弹框`);
const saveOrderData = createAction(`${ID}保存要接单的数据`);
const acceptOrderAc = createFetchAction(`${SERVICE_API}/repair/acceptData.php?code={{code}}`, [], 'GET');
export const actions = {
    setAcceptShow,
    saveOrderData,
    acceptOrderAc
}

export default handleActions({
    [setAcceptShow]: (state, {payload}) => ({
        ...state,
        acceptShow: payload
    }),
    [saveOrderData]: (state, {payload}) => ({
        ...state,
        orderData: payload
    })
},{})
