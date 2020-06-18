import React, { useState, useEffect } from "react";
import { Routes } from "./Routes";
// import { Route } from "react-router-dom";
import { setAccessToken } from "./accessToken";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      // console.log(x);
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);
  const Container = loading ? <div>Loading...</div> : <Routes />;
  return Container;
};
