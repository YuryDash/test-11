import {tasksReducer} from './tasks/tasks-reducer';
import {todolistsReducer} from './todolists/todolists-reducer';
import {combineReducers, legacy_createStore} from 'redux';
import {tagsReducer} from "./tags/tags-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    tags: tagsReducer
})
export const store = legacy_createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>


