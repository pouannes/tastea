import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import * as ROUTES from "../../../constants/routes";

import { useHistory } from "react-router-dom";

const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(10) + 1,
    },
    paddingTop: "20px",
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",
  },
  itemText: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MainDrawer({ children }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, classes.drawerClose)}
        classes={{
          paper: classes.drawerClose,
        }}
      >
        <List>
          <ListItem
            button
            className={classes.button}
            onClick={() => history.push(ROUTES.TEAS)}
          >
            <ListItemIcon>
              <EmojiFoodBeverageIcon style={{ margin: "auto" }} />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ className: classes.itemText }}
              primary="Tea list"
            />
          </ListItem>
          <ListItem button className={classes.button}>
            <ListItemIcon>
              <AddCircleIcon style={{ margin: "auto" }} />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ className: classes.itemText }}
              primary="Add tea"
            />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default MainDrawer;
