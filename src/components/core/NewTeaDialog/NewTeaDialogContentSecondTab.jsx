import React, { Fragment } from "react";

import PropTypes from "prop-types";
import {
  makeStyles,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  Button,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sideBar: {
    width: "100%",
    height: "100%",
    overflow: "scroll",
    // "&::-webkit-scrollbar": {
    //   width: "11px",
    // },
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
  mainContent: {
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
  addNewComment: {
    border: "2px dashed grey",
    width: "100%",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  newComment: {
    width: "100%",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  newCommentStars: {
    width: "100%",
    height: "100px",
  },
  commentTextField: {
    width: "100%",
    flexGrow: "1",
  },
  newCommentButtons: {
    alignSelf: "flex-end",
  },
  submitButton: {
    marginLeft: "20px",
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

const CheckboxSidebar = ({ state, handleChange }) => {
  const classes = useStyles();
  return (
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
  );
};

CheckboxSidebar.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const MainContent = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContent}>
      <div className={classes.addNewComment} onClick={() => alert("todo")}>
        <Typography>Add a new comment</Typography>
      </div>
      <div className={classes.newComment}>
        <div className={classes.newCommentStars}>stars</div>
        <div className={classes.commentTextField}>
          <TextField
            // value={description}
            // onChange={handleDescriptionChange}
            margin="none"
            label="Enter your comment here"
            type="text"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.newCommentButtons}>
          <Button variant="outlined" color="primary" size="small">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            size="small"
          >
            Save comment
          </Button>
        </div>
      </div>
    </div>
  );
};

function NewTeaDialogContentSecondTab({ checkboxStateTodo }) {
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
      <MainContent />
      <CheckboxSidebar state={state} handleChange={handleChange} />
    </>
  );
}

NewTeaDialogContentSecondTab.propTypes = {
  checkboxStateTodo: PropTypes.object,
};

export default NewTeaDialogContentSecondTab;
