import React from "react";

import { makeStyles } from "@material-ui/core";

import TeaCard from "../TeaCard/TeaCard";
import mockTeaData from "../../../images";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    paddingTop: "100px",
    paddingBottom: "100px",
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "50px 30px",
    "& div": {
      "&:nth-child(3n + 1)": {
        justifySelf: "end",
      },
      "&:nth-child(3n + 2)": {
        justifySelf: "center",
      },
      "&:nth-child(3n)": {
        justifySelf: "start",
      },
    },
  },
}));

function Page() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {mockTeaData.map((tea, i) => (
        <TeaCard key={i} {...tea} />
      ))}
    </div>
  );
}

export default Page;
