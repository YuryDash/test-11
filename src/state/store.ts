import { tasksReducer } from "./tasks/tasks-reducer";
import { todolistsReducer } from "./todolists/todolists-reducer";
import { combineReducers, legacy_createStore } from "redux";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

let preloadedState;
const persistedTodosString = localStorage.getItem("app-state");
if (persistedTodosString) {
  preloadedState = JSON.parse(persistedTodosString);
}
export const store = legacy_createStore(rootReducer, preloadedState);

store.subscribe(() => {
  localStorage.setItem("app-state", JSON.stringify(store.getState()));
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
