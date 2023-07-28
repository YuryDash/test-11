import { TaskType } from "../todolists/Todolist";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "../todolists/todolists-reducer";
import { TasksStateType } from "../../AppWithRedux";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter((el) => el.id !== action.taskId),
      };
    }

    case "ADD-TASK": {
      debugger;
      const newTask: TaskType = {
        id: action.taskId,
        title: action.title,
        isDone: false,
        tag: action.tag || null,
      };
      console.log(state, "this is state");
      return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] };
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((el) =>
          el.id === action.taskId
            ? {
                ...el,
                isDone: action.isDone,
              }
            : el
        ),
      };
    }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((el) =>
          el.id === action.taskId ? { ...el, title: action.title, tag: action.tag || null } : el
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }

    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId } as const;
};
export const addTaskAC = (title: string, todolistId: string, tag?: string) => {
  return { type: "ADD-TASK", title, todolistId, taskId: v1(), tag } as const;
};
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return { type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId } as const;
};
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string, tag?: string) => {
  return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId, tag } as const;
};
