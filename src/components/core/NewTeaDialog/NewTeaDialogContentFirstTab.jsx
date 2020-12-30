import React from "react";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  formControl: { width: "100%" },
}));

function NewTeaDialogContentFirstTab({
  name,
  handleNameChange,
  description,
  handleDescriptionChange,
  type,
  handleTypeChange,
  subType,
  handleSubTypeChange,
}) {
  const classes = useStyles();

  return (
    <div className={classes.contentRoot}>
      <TextField
        value={name}
        onChange={handleNameChange}
        margin="none"
        id="name"
        label="Tea name"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        value={description}
        onChange={handleDescriptionChange}
        margin="none"
        id="name"
        label="Tea description (optional)"
        type="text"
        multiline
        rows={6}
        fullWidth
        variant="outlined"
      />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Tea type</InputLabel>
        <Select label="Tea type" value={type} onChange={handleTypeChange}>
          <MenuItem value={"green"}>Green</MenuItem>
          <MenuItem value={"black"}>Black</MenuItem>
          <MenuItem value={"white"}>White</MenuItem>
          <MenuItem value={"oolong"}>Oolong</MenuItem>
          <MenuItem value={"rooibos"}>Rooibos</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>
          {type ? "Tea subtype" : "Select the tea type first"}
        </InputLabel>
        <Select
          label="Tea subtype"
          value={subType}
          onChange={handleSubTypeChange}
          disabled={type ? false : true}
        >
          <MenuItem value={"green"}>Green</MenuItem>
          <MenuItem value={"black"}>Black</MenuItem>
          <MenuItem value={"white"}>White</MenuItem>
          <MenuItem value={"oolong"}>Oolong</MenuItem>
          <MenuItem value={"rooibos"}>Rooibos</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

NewTeaDialogContentFirstTab.propTypes = {
  name: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  subType: PropTypes.string.isRequired,
  handleSubTypeChange: PropTypes.func.isRequired,
};

export default NewTeaDialogContentFirstTab;
