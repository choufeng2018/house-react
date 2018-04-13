import createFetchAction from './fetchAction';
import {createAction, handleActions, combineActions} from 'redux-actions';
import {SERVICE_API} from '../../_platform/api';
const ID = '与设置维修进度有关的action';
const setProVis = createAction(`${ID}设置进度界面是否可见`);
const getOrder = createFetchAction(`${SERVICE_API}/repair/getDataByReceive.php?receive={{receive}}`, [], 'GET');
const setStep = createFetchAction(`${SERVICE_API}/repair/setCurrentOrder.php?code={{code}}`, [], 'GET');
export const actions = {
    setProVis,
    getOrder,
    setStep
}
export default handleActions({
    [setProVis]: (state, {payload}) => ({
        ...state,
        provis: payload
    })
},{})
