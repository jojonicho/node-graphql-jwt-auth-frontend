import React from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const body = loading ? null : data && data.me ? (
    <div>
      Hello {data.me.username!} - {data.me.email}
    </div>
  ) : (
    <div>Not logged in </div>
  );

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      {/* <Link to="/me">Me</Link> */}
      <div>
        {!loading && data && data.me ? (
          <button
            onClick={async () => {
              await logout();
              setAccessToken("");
              await client!.resetStore();
            }}
          >
            logout
          </button>
        ) : null}
      </div>
      {body}
    </nav>
  );
};
