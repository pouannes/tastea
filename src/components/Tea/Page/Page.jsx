import React from "react";

import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import TeaImage from "../TeaImage/TeaImage";
import TeaContent from "../TeaContent/TeaContent";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "480px 1fr",
    paddingTop: "100px",
  },
}));

function Page({ image, title, description }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TeaImage image={image} title={title} />
      <TeaContent title={title} description={description} />
    </div>
  );
}

Page.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Page;
