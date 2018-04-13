import {handleActions, combineActions, createAction} from 'redux-actions';
import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const getMessage = createFetchAction(`${SERVICE_API}/message/getDataByReceive.php?msg_receive={{msg_receive}}`, [], 'GET');
export const actions = {
    getMessage
}
