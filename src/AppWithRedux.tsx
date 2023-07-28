import { Button, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { TaskType, Todolist } from "./state/todolists/Todolist";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { AppRootStateType } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export function AppWithRedux() {
  // let todolistId1 = v1();
  // let todolistId2 = v1();

  const todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists);
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);
  const dispatch = useDispatch();

  const [currentColor, setCurrentColor] = useState(0);
  const colors = ["#d500f9", "red", "blue", "black", "#f57f17", "lightGreen"];

  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string, tag?: string) {
    dispatch(addTaskAC(title, todolistId, tag));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(id, isDone, todolistId));
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string, tag?: string) {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId, tag));
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, value));
  }

  function removeTodolist(id: string) {
    dispatch(removeTodolistAC(id));
  }

  function changeTodolistTitle(id: string, title: string) {
    dispatch(changeTodolistTitleAC(id, title));
  }

  function addTodolist(title: string) {
    dispatch(addTodolistAC(title));
  }

  const mappedTodoId = todolists.map((el) => {
    return tasks[el.id];
  });

  let num = 1;
  const mappedTaskTag = mappedTodoId.map((el) => {
    return el.map((el) => {
      if (el.tag !== null) {
        return (
          <h3 key={el.id}>
            {num++}: {el.tag}
          </h3>
        );
      } else {
        return;
      }
    });
  });

  //pick color
  const colorChangeHandler = () => {
    setCurrentColor((currentColor + 1) % colors.length);
  };

  return (
    <div className="App">
      <Grid container spacing={2} style={{ margin: "20px" }}>
        {/* Хвёдер */}
        <Grid item xs={12}>
          <Grid item style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
            <AddItemForm addItem={addTodolist} />
          </Grid>
        </Grid>
        {/* Сайдбар */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={6}
            style={{ boxShadow: `0 0  15px 0 ${colors[currentColor]}`, padding: "10px 10px 10px 20px" }}
          >
            <h3 style={{ textAlign: "center" }}>Most Wonted</h3>
            <Button
              style={{ backgroundColor: `${colors[currentColor]}` }}
              variant="contained"
              onClick={colorChangeHandler}
            >
              change color
            </Button>
            {mappedTaskTag}
          </Paper>
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
                <Grid item key={tl.id} style={{ margin: "10px" }}>
                  <Paper elevation={8} style={{ boxShadow: `0 0  5px 0 ${colors[currentColor]}`, padding: "10px" }}>
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
