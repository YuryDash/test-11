import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { ChangeEvent } from "react";
import { FilterValuesType } from "../../AppWithRedux";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import { Task } from "../tasks/Task";
import Tooltip from "@mui/material/Tooltip";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
  tag: string | null;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string, tag?: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string, tag?: string) => void;
};

export function Todolist(props: PropsType) {
  const addTask = (title: string, tag?: string) => {
    props.addTask(title, props.id, tag);
  };

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <Tooltip title="Delete">
          <IconButton onClick={removeTodolist}>
            <Delete />
          </IconButton>
        </Tooltip>
      </h3>

      <AddItemForm addItem={addTask} />

      <div>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          };
          const onTitleChangeHandler = (newValue: string, tag?: string) => {
            props.changeTaskTitle(t.id, newValue, props.id, tag);
          };
          return (
            <Task
              key={t.id}
              task={t}
              onClickHandler={onClickHandler}
              onTitleChangeHandler={onTitleChangeHandler}
              onChangeHandler={onChangeHandler}
            />
          );
        })}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button variant={props.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"inherit"}>
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
