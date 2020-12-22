import React, { memo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { DropzoneArea } from "material-ui-dropzone";

// when image is dropped I don't want to have the text and borders
// and pointers
const useStyles = makeStyles((theme) => ({
  dropzone: {
    borderColor: (props) =>
      props.image ? "transparent" : "rgba(255, 255, 255, 0.12)",
    cursor: (props) => (props.image ? "default" : "pointer"),
  },
  dropzoneText: {
    visibility: (props) => (props.image ? "hidden" : ""),
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiDropzoneArea: {
      root: {
        backgroundColor: "transparent",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "rgba(255, 255, 255, 0.12)",
      },
      icon: {
        color: "white",
      },
    },
    MuiDropzonePreviewList: {
      root: {
        position: "absolute",
        top: "24px",
        left: "8px",
        height: "100%",
      },
      imageContainer: {
        width: "100%",
        maxWidth: "100%",
        flexBasis: "100%",
        padding: "8px 32px 32px 32px !important",
        "&:hover $image": {
          opacity: "1",
          filter: "brightness(0.6) contrast(1.15)",
        },
        "&:hover $removeButton": {
          opacity: 1,
        },
      },
      image: {
        height: "",
        maxWidth: "500px",
        maxHeight: "350px",
        filter: "brightness(0.8) contrast(1.15)",
      },
      // might be better to position it relative to the image rather than absolute
      removeButton: {
        transition: ".5s ease",
        position: "absolute",
        opacity: 0,
        top: "10px",
        right: "50px",
        width: 40,
        height: 40,
        "&:focus": {
          opacity: 1,
        },
      },
    },
    MuiDropzoneSnackbar: {
      errorAlert: {
        backgroundColor: "#d32f2f",
        color: "#fff",
      },
      successAlert: {
        backgroundColor: "#388e3c",
        color: "rgba(0,0,00.87)",
      },
      infoAlert: {
        backgroundColor: "#1976d2",
        color: "#fff",
      },
      warningAlert: {
        backgroundColor: "#f57c00",
        color: "rgba(0,0,00.87)",
      },
    },
  },
});

// blank icon to pass `Icon` validation in DropzoneArea
const BlankIcon = () => {
  return <span></span>;
};

function Dropzone({ image, setImage }) {
  const classes = useStyles({ image });
  return (
    <MuiThemeProvider theme={theme}>
      <DropzoneArea
        acceptedFiles={["image/*"]}
        filesLimit={1}
        dropzoneClass={classes.dropzone}
        dropzoneParagraphClass={classes.dropzoneText}
        // when image is dropped I don't want click to open a window
        dropzoneProps={{ noClick: image ? true : false }}
        Icon={image ? BlankIcon : CloudUploadIcon}
        dropzoneText={"Drag and drop an image here or click"}
        onChange={(files) => setImage(files[0])}
        alertSnackbarProps={{ autoHideDuration: 2000 }}
      />
    </MuiThemeProvider>
  );
}

Dropzone.propTypes = {
  image: PropTypes.object,
  setImage: PropTypes.func,
};

export default memo(Dropzone);
