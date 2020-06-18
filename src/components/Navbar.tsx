import React from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import styled from "@emotion/styled";

// const StyledLink = styled(Link)`
//   font-weight: bold;
//   // font-family: ${props => props.theme.fontFamily.body};
//   // color: ${props => props.theme.colors.secondary.base};
//   // transition: all ${props => props.theme.transitions.default.duration};
//   // &:hover {
//   //   color: ${props => props.theme.colors.primary.base};
//   // }
// `;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 1.1rem;
  align-items: center;
  a {
    margin-right: 2rem;
  }
`;

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const body = loading ? null : data && data.me ? (
    <div>
      Hello {data.me.username!} - {data.me.email}
    </div>
  ) : null;
  // <div>Not logged in </div>

  return (
    <Nav>
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
        {body}
      </div>
    </Nav>
  );
};
