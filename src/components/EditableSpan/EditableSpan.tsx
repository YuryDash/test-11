import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string, tag?: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);
  let [tag, setTag] = useState("");

  //=====================================================================
  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const validationGrid = /#(.*)/g;
    const matches = event.currentTarget.value.match(validationGrid);

    setTitle(event.currentTarget.value);

    if (matches) {
      const newTags = matches.map((match) => match.slice(1));
      const uniqueTags = newTags.filter((el, index, self) => self.indexOf(el) === index);
      setTag(uniqueTags[0]);
    } else {
      setTag("");
    }
  };
  //=====================================================================

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title, tag);
  };
  // const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
  //     setTitle(e.currentTarget.value)
  // }

  return editMode ? (
    <TextField value={title} onChange={handleNoteChange} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
}
