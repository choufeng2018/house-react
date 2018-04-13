import createFetchAction from './fetchAction';
import {SERVICE_API} from '../../_platform/api';
const getDorInfo = createFetchAction(`${SERVICE_API}/doradmin/getDorAdminByNo.php?doradmin_no={{doradmin_no}}`, [], 'GET');
const putDorPass = createFetchAction(`${SERVICE_API}/doradmin/editDorAdminPass.php`, [], 'POST');
const getSuperInfo = createFetchAction(`${SERVICE_API}/SuperAdmin/getSuper.php`, [], 'GET');
const putSuperPass = createFetchAction(`${SERVICE_API}/SuperAdmin/putSuper.php`, [], 'POST');
const getRepInfo = createFetchAction(`${SERVICE_API}/repairMan/getDataByNo.php?repman_no={{repman_no}}`, [], 'GET');
const putRepPass = createFetchAction(`${SERVICE_API}/repairMan/putPassByNo.php`, [], 'POST');
const getOwnerInfo = createFetchAction(`${SERVICE_API}/owner/getDataByNo.php?owner_no={{owner_no}}`, [], 'GET');
const putOwnerPass = createFetchAction(`${SERVICE_API}/owner/putPassByNo.php`, [], 'POST');
export const actions = {
    getDorInfo,
    putDorPass,
    getSuperInfo,
    putSuperPass,
    getRepInfo,
    putRepPass,
    getOwnerInfo,
    putOwnerPass
}
