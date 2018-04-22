import { createAction, handleActions, combineActions } from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const ID = "与接单有关的action";
const getRepair = createFetchAction(`${SERVICE_API}/repair/getData.php`, [], 'GET');
const saveOrderData = createAction(`${ID}保存要接单的数据`);
const acceptOrderAc = createFetchAction(`${SERVICE_API}/repair/acceptData.php?code={{code}}&receive={{receive}}`, [], 'GET');
export const actions = {
    getRepair,
    acceptOrderAc,
    saveOrderData
}
export default handleActions({
    [saveOrderData]: (state, {payload}) => ({
        ...state,
        orderData: payload
    })
},{})
