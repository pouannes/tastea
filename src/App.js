import { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import * as ROUTES from "./constants/routes";
import mockTeaData from "./images";

import TeasPage from "./components/Teas/Page/Page";
import TeaPage from "./components/Tea/Page/Page";
import MainDrawer from "./components/core/MainDrawer/MainDrawer";
import NewTeaDialog from "./components/core/NewTeaDialog/NewTeaDialog";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
      paper: "#303030",
    },
  },
});

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path={ROUTES.TEAS}>
              <MainDrawer handleOpenDialog={handleClickDialogOpen}>
                <TeasPage />
              </MainDrawer>
            </Route>
            <Route
              exact
              path={ROUTES.TEA}
              render={(routeProps) => {
                return (
                  <MainDrawer handleOpenDialog={handleClickDialogOpen}>
                    <TeaPage
                      {...mockTeaData.filter(
                        (tea) => tea.name === routeProps.match.params.tea
                      )[0]}
                    />
                  </MainDrawer>
                );
              }}
            />
            <Route path="*">
              <Redirect to={ROUTES.TEAS} />
            </Route>
          </Switch>
        </Router>
        <NewTeaDialog open={dialogOpen} handleClose={handleDialogClose} />
      </ThemeProvider>
    </div>
  );
}

export default App;
