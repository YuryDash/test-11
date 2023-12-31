import TextField from "@mui/material/TextField/TextField";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";

type AddItemFormPropsType = {
  addItem: (title: string, tag?: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = ({ addItem }) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  //====================================================================================================
  const [tag, setTag] = useState<string>("");

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
  //====================================================================================================

  const addItems = () => {
    if (title.trim() !== "") {
      addItem(title, tag);
      setTag("");
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addItems();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={handleNoteChange}
        onKeyDown={onKeyDownHandler}
        label="Title"
        helperText={error}
        inputProps={{ maxLength: 20 }}
      />
      <IconButton color="primary" onClick={addItems}>
        <AddBox />
      </IconButton>
    </div>
  );
};
