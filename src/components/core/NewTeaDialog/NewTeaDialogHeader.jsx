import React from "react";

import {
  makeStyles,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "110px",
    width: "100%",
    backgroundColor: theme.palette.grey[800],
    marginBottom: "30px",
    color: theme.palette.getContrastText(theme.palette.grey[800]),
  },
  title: {
    paddingBottom: 0,
    fontSize: "1.4rem",
  },
  stepper: {
    backgroundColor: theme.palette.grey[800],
    width: "500px",
    paddingTop: "12px",
    paddingLeft: "16px",
  },
}));

function NewTeaDialogHeader({ activeStep }) {
  const classes = useStyles();
  const steps = ["Add the new tea", "Enter some additional information"];
  return (
    <div className={classes.root}>
      <DialogTitle className={classes.title}>Add a new tea</DialogTitle>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => {
          return (
            <Step
              key={label}
              completed={index < activeStep}
              active={index === activeStep}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

NewTeaDialogHeader.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default NewTeaDialogHeader;
