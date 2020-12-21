import React from "react";

import { makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

import BreadcrumbNav from "../BreadcrumbNav/BreadcrumbNav";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "-40px",
    maxWidth: "480px",
    textAlign: "justify",
    textJustify: "inter-word",
    paddingTop: "78px",
  },
  title: {
    marginBottom: "0.8rem",
  },
  nav: {
    paddingBottom: "20px",
  },
}));

function TeaContent({ title, description }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BreadcrumbNav title={title} />
      <Typography
        variant="h6"
        color="textPrimary"
        component="p"
        className={classes.title}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {description}
      </Typography>
    </div>
  );
}

TeaContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TeaContent;
