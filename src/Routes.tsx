import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home, Login, Register } from "./pages";

import { Me } from "./pages/Me";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/me">Me</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/me" component={Me} />
      </Switch>
    </BrowserRouter>
  );
};
