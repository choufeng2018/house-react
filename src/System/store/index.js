import {combineActions, handleActions} from 'redux-actions'
import {actionsMap} from '../../_platform/store/util'
import CreateDormitoryReducer, {actions as CreateDormitoryActions} from './CreateDormitory';
import DorAdminReducer, {actions as DorAdminActions} from './DorAdmin';
import DormitoryReducer, {actions as DormitoryActions} from './Dormitory';
import permissionReducer, {actions as permissionActions} from './Permission';
import repairManReducer, {actions as repairManActions} from './repairMan';
export default handleActions({
    [combineActions(...actionsMap(CreateDormitoryActions))]: (state = {}, action) => ({
        ...state,
        createDormitory: CreateDormitoryReducer(state.createDormitory, action)
    }),
    [combineActions(...actionsMap(DorAdminActions))]: (state = {}, action) => ({
        ...state,
        dorAdmin: DorAdminReducer(state.dorAdmin, action)
    }),
    [combineActions(...actionsMap(DormitoryActions))]: (state, action) => ({
        ...state,
        dormitory: DormitoryReducer(state.dormitory, action)
    }),
    [combineActions(...actionsMap(permissionActions))]: (state, action) => ({
        ...state,
        permission: permissionReducer(state.permission, action)
    }),
    [combineActions(...actionsMap(repairManActions))]: (state, action) => ({
        ...state,
        repairMan: repairManReducer(state.repairMan, action)
    })
},{})
