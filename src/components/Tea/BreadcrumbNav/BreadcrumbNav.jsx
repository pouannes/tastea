import React from "react";

import { makeStyles, Typography, Breadcrumbs, Link } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import PropTypes from "prop-types";

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const useStyles = makeStyles((theme) => ({
  root: {
    gridRow: 1,
    paddingBottom: "20px",
  },
  title: {
    marginBottom: "0.8rem",
  },
}));

function BreadcrumbNav({ title }) {
  const classes = useStyles();

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        <LinkRouter color="inherit" to="/teas">
          Teas
        </LinkRouter>
        <Link color="inherit" href="/green" onClick={handleClick}>
          Green
        </Link>
        <Typography color="textPrimary">{title}</Typography>
      </Breadcrumbs>
    </div>
  );
}

BreadcrumbNav.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BreadcrumbNav;
