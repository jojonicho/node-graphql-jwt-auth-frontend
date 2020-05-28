import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const [reg] = useRegisterMutation();
  const onSubmit = handleSubmit(async ({ username, email, password }) => {
    const response = await reg({
      variables: {
        username,
        email,
        password,
      },
    });
    history.push("/");
    console.log(response);
  });
  return (
    <form onSubmit={onSubmit}>
      <label>username</label>
      <input name="username" placeholder="username" ref={register} />
      {errors.username && "username is required."}
      <label>email</label>
      <input name="email" placeholder="email" ref={register} />
      {errors.email && "email is required"}
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
