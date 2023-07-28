import React, { ChangeEvent } from "react";
import { Checkbox, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskType } from "../todolists/Todolist";
import s from "./task.module.css";

type TaskPropsType = {
  task: TaskType;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onTitleChangeHandler: (newValue: string, tag?: string) => void;
  onClickHandler: () => void;
};

export const Task: React.FC<TaskPropsType> = ({ task, onChangeHandler, onTitleChangeHandler, onClickHandler }) => {
  return (
    <div>
      <div key={task.id} className={task.isDone ? `${s.isDone}` : ""}>
        <Checkbox checked={task.isDone} color="primary" onChange={onChangeHandler} />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
          <Tooltip title="Delete">
            <Delete />
          </Tooltip>
        </IconButton>
      </div>
    </div>
  );
};
