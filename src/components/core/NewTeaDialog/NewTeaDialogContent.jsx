import React from "react";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: { width: "100%", marginTop: "30px" },
}));

function NewTeaDialogContent({
  name,
  handleNameChange,
  description,
  handleDescriptionChange,
  type,
  handleTypeChange,
}) {
  const classes = useStyles();

  return (
    <div>
      <TextField
        value={name}
        onChange={handleNameChange}
        margin="none"
        id="name"
        label="Tea name"
        type="text"
        required
        fullWidth
        variant="outlined"
        style={{ marginBottom: "30px" }}
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
    </div>
  );
}

NewTeaDialogContent.propTypes = {
  name: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
};

export default NewTeaDialogContent;
