import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Navbar } from "./components/Navbar";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/me" component={Me} /> */}
      </Switch>
    </BrowserRouter>
  );
};
