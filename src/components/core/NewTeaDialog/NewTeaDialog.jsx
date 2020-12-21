import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { makeStyles, Typography } from "@material-ui/core";

import { useFirebase } from "../Firebase/Firebase";
import Dropzone from "../Dropzone/Dropzone";
import NewTeaDialogContent from "./NewTeaDialogContent";
import NewTeaDialogHeader from "./NewTeaDialogHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    maxWidth: "800px",
    height: "680px",
    borderRadius: "16px",
    paddingBottom: "20px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "450px 1fr",
    gridGap: "30px",
    paddingBottom: "30px",
  },
}));

function NewTeaDialog({ open, handleClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const firebase = useFirebase();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleNext = () => {
    setActiveStep(1);
  };

  const handleCancel = () => {
    handleClose();
    setActiveStep(0);
    setImage({});
    setName("");
    setDescription("");
    setType("");
  };

  const handleSubmit = () => {
    console.log("submiting... ");
    firebase
      .addNewTea(name, description, type)
      .then(() => console.log("success!"))
      .catch((e) => console.log("error: ", e));
  };

  const classes = useStyles({ image });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="Add a new tea"
        aria-describedby="Form to add a new tea"
        classes={{ paper: classes.root }}
        disableBackdropClick
      >
        <NewTeaDialogHeader activeStep={activeStep} />
        <DialogContent className={classes.content}>
          {activeStep === 0 ? (
            <>
              <Dropzone image={image} setImage={setImage} />
              <NewTeaDialogContent
                name={name}
                handleNameChange={handleNameChange}
                description={description}
                handleDescriptionChange={handleDescriptionChange}
                type={type}
                handleTypeChange={handleTypeChange}
              />
            </>
          ) : (
            <Typography color="inherit">Additionnal info haha</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="outlined">
            cancel
          </Button>
          <Button
            onClick={activeStep === 0 ? handleNext : handleSubmit}
            color="primary"
            variant="contained"
          >
            {activeStep === 0 ? "Next" : "Finish"}
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
