// import React, { useReducer, useState } from "react";
// import "./App.css";
// import { TaskType, Todolist } from "./Todolist";
// import { v1 } from "uuid";
// import { AddItemForm } from "./components/AddItemForm/AddItemForm";
// import {
//   addTodolistAC,
//   changeTodolistFilterAC,
//   changeTodolistTitleAC,
//   removeTodolistAC,
//   todolistsReducer,
// } from "./state/todolists-reducer";
// import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";
// import { useDispatch, useSelector } from "react-redux";
// import { AppRootStateType } from "./state/store";
// import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
// import { Menu } from "@mui/icons-material";
// import { EditableSpan } from "./components/EditableSpan/EditableSpan";

// export type FilterValuesType = "all" | "active" | "completed";
// export type TodolistType = {
//   id: string;
//   title: string;
//   filter: FilterValuesType;
// };

// export type TasksStateType = {
//   [key: string]: Array<TaskType>;
// };

// function AppWithRedux() {
//   let todolistId1 = v1();
//   let todolistId2 = v1();

//   const todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists);
//   const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);
//   const dispatch = useDispatch();

//   function removeTask(id: string, todolistId: string) {
//     const action = removeTaskAC(id, todolistId);
//     dispatch(action);
//   }

//   function addTask(title: string, todolistId: string) {
//     const action = addTaskAC(title, todolistId);
//     dispatch(action);
//   }

//   function changeStatus(id: string, isDone: boolean, todolistId: string) {
//     const action = changeTaskStatusAC(id, isDone, todolistId);
//     dispatch(action);
//   }

//   function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
//     const action = changeTaskTitleAC(id, newTitle, todolistId);
//     dispatch(action);
//   }

//   function changeFilter(value: FilterValuesType, todolistId: string) {
//     const action = changeTodolistFilterAC(todolistId, value);
//     dispatch(action);
//   }

//   function removeTodolist(id: string) {
//     const action = removeTodolistAC(id);
//     dispatch(action);
//   }

//   function changeTodolistTitle(id: string, title: string) {
//     const action = changeTodolistTitleAC(id, title);
//     dispatch(action);
//   }

//   function addTodolist(title: string) {
//     const action = addTodolistAC(title);
//     dispatch(action);
//   }

//   return (
//     <div className="App">
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h5">Todos for test</Typography>
//         </Toolbar>
//       </AppBar>

//       <Grid spacing={3}>
//         <Grid item style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
//           <AddItemForm addItem={addTodolist} />
//         </Grid>
//         <Grid container>
//           {todolists.map((tl) => {
//             let allTodolistTasks = tasks[tl.id];
//             let tasksForTodolist = allTodolistTasks;

//             if (tl.filter === "active") {
//               tasksForTodolist = allTodolistTasks.filter((t) => !t.isDone);
//             }
//             if (tl.filter === "completed") {
//               tasksForTodolist = allTodolistTasks.filter((t) => t.isDone);
//             }

//             return (
//               <Grid item key={tl.id}>
//                 <Paper style={{ padding: "10px" }}>
//                   <Todolist
//                     id={tl.id}
//                     title={tl.title}
//                     tasks={tasksForTodolist}
//                     removeTask={removeTask}
//                     changeFilter={changeFilter}
//                     addTask={addTask}
//                     changeTaskStatus={changeStatus}
//                     filter={tl.filter}
//                     removeTodolist={removeTodolist}
//                     changeTaskTitle={changeTaskTitle}
//                     changeTodolistTitle={changeTodolistTitle}
//                   />
//                 </Paper>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default AppWithRedux;

//========================================================================================================================
import {Grid, Paper} from "@mui/material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {v1} from "uuid";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists);
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);
  const dispatch = useDispatch();

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatch(action);
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatch(action);
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(id, isDone, todolistId);
    dispatch(action);
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(id, newTitle, todolistId);
    dispatch(action);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  }

  function removeTodolist(id: string) {
    const action = removeTodolistAC(id);
    dispatch(action);
  }

  function changeTodolistTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatch(action);
  }

  return (
    <div className="App">
      <Grid container spacing={2}>
        {/* Хедер */}
        <Grid item xs={12}>
          <Grid item style={{padding: "20px", display: "flex", justifyContent: "center"}}>
            <AddItemForm addItem={addTodolist}/>
          </Grid>
        </Grid>
        {/* Сайдбар */}
        <Grid item xs={12} md={3}>
          <Paper>Сайдбар</Paper>
        </Grid>
        {/* Основной контент */}
        <Grid item xs={12} md={9}>
          <Grid container>
            {todolists.map((tl) => {
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;

              if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter((t) => !t.isDone);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter((t) => t.isDone);
              }

              return (
                <Grid item key={tl.id} style={{margin: "10px"}}>
                  <Paper style={{padding: "10px"}}>
                    <Todolist
                      id={tl.id}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AppWithRedux;
