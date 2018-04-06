import asideReducer, * as asideActions from './aside';
// import locationReducer, * as locationActions from './location';
// import previewReducer, * as previewActions from './preview';
import tabsReducer, * as tabsActions from './tabs';
// import progressReducer, * as progressActions from '../../components/Progress/store';

import {handleActions, combineActions} from 'redux-actions';
// import {
// 	dirFactory, docFactory, docsFactory, taskFactory, tasksFactory, usersFactory,
// 	workflowAction, wpFactory, orgFactory, metaFactory, rolesFactory, membersFactory, locsFactory,
// } from '../higher-order';
import {actionsMap} from '../util';

const ID = 'SINGLETON';
// const dirReducer = dirFactory(ID);
// const docReducer = docFactory(ID);
// const docsReducer = docsFactory(ID);
// const wpReducer = wpFactory(ID);
// const orgReducer = orgFactory(ID);
// const rolesReducer = rolesFactory(ID);
// const membersReducer = membersFactory(ID);
// const taskReducer = taskFactory(ID);
// const tasksReducer = tasksFactory(ID);
// const usersReducer = usersFactory(ID);
// const majorReducer = metaFactory(ID, 'major');
// const stageReducer = metaFactory(ID, 'stage');
// const blueprintStageReducer = metaFactory(ID, 'blueprintstage');
// const docTypeReducer = metaFactory(ID, 'documenttype');
// const locsReducer = locsFactory(ID);

export const actions = {
	...asideActions,
    ...tabsActions,
    // ...previewActions,
	// ...locationActions,
	// ...dirReducer,
	// ...docReducer,
	// ...docsReducer,
	// ...taskReducer,
	// ...tasksReducer,
	// ...usersReducer,
	// ...wpReducer,
	// ...orgReducer,
	// ...rolesReducer,
	// ...membersReducer,
	// ...majorReducer,
	// ...stageReducer,
	// ...blueprintStageReducer,
	// ...docTypeReducer,
	// ...workflowAction,
	// ...locsReducer,
	// ...progressActions
};

export default handleActions({
	[combineActions(...actionsMap(asideActions))]: (state, action) => ({
		...state,
		aside: asideReducer(state.aside, action),
	}),
    [combineActions(...actionsMap(tabsActions))]: (state, action) => ({
        ...state,
        tabs: tabsReducer(state.tabs, action),
    }),
    // [combineActions(...actionsMap(previewActions))]: (state, action) => ({
    //     ...state,
    //     preview: previewReducer(state.preview, action),
    // }),
    // [combineActions(...actionsMap(locationActions))]: (state, action) => ({
    //     ...state,
    //     location: locationReducer(state.location, action),
    // }),
	// [combineActions(...actionsMap(dirReducer))]: (state, action) => ({
	// 	...state,
	// 	dir: dirReducer(state.dir, action),
	// }),
	// [combineActions(...actionsMap(taskReducer))]: (state, action) => ({
	// 	...state,
	// 	task: taskReducer(state.task, action),
	// }),
	// [combineActions(...actionsMap(tasksReducer))]: (state, action) => ({
	// 	...state,
	// 	tasks: tasksReducer(state.tasks, action),
	// }),
	// [combineActions(...actionsMap(docReducer))]: (state, action) => ({
	// 	...state,
	// 	doc: docReducer(state.doc, action),
	// }),
	// [combineActions(...actionsMap(docsReducer))]: (state, action) => ({
	// 	...state,
	// 	docs: docsReducer(state.docs, action),
	// }),
	// [combineActions(...actionsMap(usersReducer))]: (state, action) => ({
	// 	...state,
	// 	users: usersReducer(state.users, action),
	// }),
	// [combineActions(...actionsMap(wpReducer))]: (state, action) => ({
	// 	...state,
	// 	wp: wpReducer(state.wp, action),
	// }),
	// [combineActions(...actionsMap(orgReducer))]: (state, action) => ({
	// 	...state,
	// 	org: orgReducer(state.org, action),
	// }),
	// [combineActions(...actionsMap(rolesReducer))]: (state, action) => ({
	// 	...state,
	// 	roles: rolesReducer(state.roles, action),
	// }),
	// [combineActions(...actionsMap(membersReducer))]: (state, action) => ({
	// 	...state,
	// 	members: membersReducer(state.members, action),
	// }),
	// [combineActions(...actionsMap(majorReducer))]: (state, action) => ({
	// 	...state,
	// 	majors: majorReducer(state.majors, action),
	// }),
	// [combineActions(...actionsMap(stageReducer))]: (state, action) => ({
	// 	...state,
	// 	stages: stageReducer(state.stages, action),
	// }),
	// [combineActions(...actionsMap(blueprintStageReducer))]: (state, action) => ({
	// 	...state,
	// 	blueprintStages: blueprintStageReducer(state.blueprintStages, action),
	// }),
	// [combineActions(...actionsMap(docTypeReducer))]: (state, action) => ({
	// 	...state,
	// 	docTypes: docTypeReducer(state.docTypes, action),
	// }),
	// [combineActions(...actionsMap(locsReducer))]: (state, action) => ({
	// 	...state,
	// 	locs: locsReducer(state.locs, action),
	// }),
	// [combineActions(...actionsMap(progressActions))]: (state, action) => ({
	// 	...state,
	// 	progress: progressReducer(state.progress, action),
	// }),
}, {});
