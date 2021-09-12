import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function index({
  myValue,
  handleChange,
  errors,
  placeeHolder,
  labelText,
  nameText,
}) {
  return (
    <>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        value={myValue ? myValue : ""}
        onChange={handleChange(nameText)}
        id={nameText}
        placeholder={placeeHolder}
        label={labelText}
        name={nameText}
        InputLabelProps={{
          shrink: true,
        }}
        error={errors[nameText] && errors[nameText]}
        helperText={errors[nameText] && errors[nameText]}
        autoFocus
      />
    </>
  );
}
