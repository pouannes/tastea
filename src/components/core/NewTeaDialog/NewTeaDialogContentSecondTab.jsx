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
    height: "100%",
    overflow: "scroll",
  },
  sidebarTitle: {
    marginBottom: "1.2rem",
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
    marginBottom: "0.5rem",
  },
  primaryCheckbox: {
    marginBottom: "0.5rem",
  },
}));

const checkboxes = [
  {
    name: "honey",
    label: "Honey",
    type: "category",
    sub: [
      {
        name: "lavender",
        label: "Lavender",
      },
      {
        name: "flowers",
        label: "Flowers",
      },
      {
        name: "chestnut",
        label: "Chesnut",
      },
      {
        name: "sweetChestnut",
        label: "Sweet chesnut",
      },
    ],
  },

  {
    name: "sugar",
    label: "Sugar",
    type: "category",
    sub: [
      {
        name: "white",
        label: "White",
      },
      {
        name: "brown",
        label: "Brown",
      },
    ],
  },
  {
    name: "tapiocaPearls",
    label: "Tapioca pearls",
    type: "checkbox",
  },
  {
    name: "milk",
    label: "Milk",
    type: "checkbox",
  },
  {
    name: "cream",
    label: "Cream",
    type: "checkbox",
  },
];

function NewTeaDialogContentSecondTab({ checkboxStateTodo }) {
  const classes = useStyles();

  // ok so that's definitly way too complicated than it should be but it's the best
  // I could do with the current data format
  // either change data format or find a better way to do this to refactor the horror below
  // concat trick taken
  // from https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
  const [state, setState] = React.useState(
    Object.fromEntries(
      [].concat.apply(
        [],
        checkboxes.map((checkbox) =>
          checkbox.type === "checkbox"
            ? [[checkbox.name, false]]
            : [].concat.apply(
                [],
                [checkbox.sub.map((sub) => [sub.name, false])]
              )
        )
      )
    )
  );

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <>
      <div className={classes.mainContent}>
        <Typography>I'm the second tab main content</Typography>
      </div>
      <div className={classes.sideBar}>
        <Typography className={classes.sidebarTitle}>
          This tea goes well with...
        </Typography>
        <div className={classes.checkboxesContainer}>
          {checkboxes.map((mainCheckbox) => (
            <Fragment key={mainCheckbox.name}>
              {mainCheckbox.type === "category" ? (
                <>
                  <Typography>{mainCheckbox.label}</Typography>
                  <FormControl className={classes.checkboxesSubContainer}>
                    {mainCheckbox.sub.map((subCheckbox) => (
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
                </>
              ) : (
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
                  className={classes.primaryCheckbox}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

NewTeaDialogContentSecondTab.propTypes = {
  checkboxStateTodo: PropTypes.object,
};

export default NewTeaDialogContentSecondTab;
