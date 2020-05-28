import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation, useLoginMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";

type FormData = {
  username: string;
  password: string;
};

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const [login] = useLoginMutation();
  const onSubmit = handleSubmit(async ({ username, password }) => {
    const response = await login({
      variables: {
        username,
        password,
      },
    });
    history.push("/");
    console.log(response);
    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <label>username</label>
      <input name="username" placeholder="username" ref={register} />
      {errors.username && "username is required."}
      <label>password</label>
      <input
        type="password"
        placeholder="password"
        name="password"
        ref={register}
      />
      {errors.password && "password is required."}
      <input type="submit" />
    </form>
  );
};
