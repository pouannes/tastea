import React, { memo } from "react";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import LinesEllipsis from "react-lines-ellipsis";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,

    maxWidth: "345px",
    minWidth: "250px",
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: "75%", // 16:9
    filter: "brightness(0.8) contrast(1.2)",
  },
  content: {
    paddingBottom: 0,
  },
  descriptionText: {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    lineHeight: "1.43",
    letterSpacing: "0.01071rem",
  },
  button: {
    color: "rgba(255, 255, 255, 0.85)",
    paddingLeft: "8px",
  },
}));

function TeaCard({ image, name, title, description }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => history.push(`/teas/${name}`);

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent className={classes.content}>
        <Typography variant="h6" color="textPrimary" component="p" gutterBottom>
          {title}
        </Typography>
        <LinesEllipsis
          className={classes.descriptionText}
          text={description}
          maxLine="4"
          ellipsis=" ..."
        />
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.button}>
          Go to tea
        </Button>
      </CardActions>
    </Card>
  );
}

TeaCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default memo(TeaCard);
