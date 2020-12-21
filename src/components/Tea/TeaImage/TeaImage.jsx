import React from "react";

import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: { pointerEvents: "none" },
  image: {
    filter: "brightness(0.8) contrast(1.15)",
  },
}));

function TeaImage({ image, title }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={image} alt={title} className={classes.image} />
    </div>
  );
}

TeaImage.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default TeaImage;
