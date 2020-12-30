import React, { Fragment } from "react";

import PropTypes from "prop-types";
import {
  makeStyles,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: "100%",
  },
  sideBar: {
    width: "100%",
  },
  checkboxesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: "11px",
    marginTop: "4px",
  },
  checkboxesSubContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: "22px",
  },
}));

const checkboxes = [
  {
    name: "honey",
    label: "Honey",
    hasSub: true,
  },
  {
    name: "lavender",
    label: "Lavender",
    isSub: "honey",
  },
  {
    name: "flowers",
    label: "Flowers",
    isSub: "honey",
  },

  {
    name: "tapiocaPearls",
    label: "Tapioca pearls",
  },
  {
    name: "sugar",
    label: "Sugar",
    hasSub: true,
  },
  {
    name: "white",
    label: "White",
    isSub: "sugar",
  },
  {
    name: "brown",
    label: "Brown",
    isSub: "sugar",
  },
];

function NewTeaDialogContentSecondTab() {
  const classes = useStyles();

  const [state, setState] = React.useState(
    Object.fromEntries(checkboxes.map((checkbox) => [checkbox.name, false]))
  );

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    const currCheckbox = checkboxes.reduce((acc, curr) =>
      curr.name === event.target.name ? curr : acc
    );

    if (currCheckbox.hasSub && !event.target.checked) {
      checkboxes
        .filter((checkbox) => checkbox.isSub === currCheckbox.name)
        .forEach((checkbox) =>
          setState((state) => ({
            ...state,
            [checkbox.name]: event.target.checked,
          }))
        );
    }
  };
  return (
    <>
      <div className={classes.mainContent}>
        <Typography>I'm the second tab main content</Typography>
      </div>
      <div className={classes.sideBar}>
        <Typography>This tea goes well with...</Typography>
        <div className={classes.checkboxesContainer}>
          {checkboxes
            .filter((checkbox) => !checkbox.isSub)
            .map((mainCheckbox) => (
              <Fragment key={mainCheckbox.name}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state[mainCheckbox.name]}
                      onChange={handleChange}
                      name={mainCheckbox.name}
                      color="primary"
                    />
                  }
                  label={mainCheckbox.label}
                />
                {mainCheckbox.hasSub ? (
                  <FormControl
                    disabled={!state[mainCheckbox.name]}
                    className={classes.checkboxesSubContainer}
                  >
                    {checkboxes
                      .filter(
                        (checkbox) => checkbox.isSub === mainCheckbox.name
                      )
                      .map((subCheckbox) => (
                        <FormControlLabel
                          key={subCheckbox.name}
                          control={
                            <Checkbox
                              checked={state[subCheckbox.name]}
                              onChange={handleChange}
                              name={subCheckbox.name}
                              color="primary"
                            />
                          }
                          label={subCheckbox.label}
                        />
                      ))}
                  </FormControl>
                ) : (
                  ""
                )}
              </Fragment>
            ))}
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={state.honey}
                onChange={handleChange}
                name="honey"
                color="primary"
              />
            }
            label="Honey"
          />
          <FormControl
            disabled={!state.honey}
            className={classes.checkboxesSubContainer}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.honeyLavender}
                  onChange={handleChange}
                  name="lavender"
                  color="primary"
                />
              }
              label="Lavender"
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.tapiocaPearls}
                onChange={handleChange}
                name="tapiocaPearls"
                color="primary"
              />
            }
            label="Tapioca pearls"
          /> */}
        </div>
      </div>
    </>
  );
}

NewTeaDialogContentSecondTab.propTypes = {};

export default NewTeaDialogContentSecondTab;
