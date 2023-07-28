import {tasksReducer} from './tasks/tasks-reducer';
import {todolistsReducer} from './todolists/todolists-reducer';
import {combineReducers, legacy_createStore} from 'redux';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})
export const store = legacy_createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>


