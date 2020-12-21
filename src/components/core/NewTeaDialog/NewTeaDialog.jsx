import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

import Dropzone from "../Dropzone/Dropzone";
import NewTeaDialogContent from "./NewTeaDialogContent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    maxWidth: "800px",
    height: "550px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "450px 1fr",
    gridGap: "30px",
    paddingBottom: "30px",
  },
}));

function NewTeaDialog({ open, handleClose }) {
  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const classes = useStyles({ image });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Add a new tea"
        aria-describedby="Form to add a new tea"
        classes={{ paper: classes.root }}
      >
        <DialogTitle>Add a new tea</DialogTitle>
        <DialogContent className={classes.content}>
          <Dropzone image={image} setImage={setImage} />
          <NewTeaDialogContent
            name={name}
            handleNameChange={handleNameChange}
            description={description}
            handleDescriptionChange={handleDescriptionChange}
            type={type}
            handleTypeChange={handleTypeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Add tea
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

NewTeaDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default NewTeaDialog;
