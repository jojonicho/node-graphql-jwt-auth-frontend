import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

type FormData = {
  username: string;
  password: string;
};

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const [reg] = useRegisterMutation();
  const onSubmit = handleSubmit(async ({ username, password }) => {
    const response = await reg({
      variables: {
        username,
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
      <label>password</label>
      <input
        type="password"
        placeholder="password"
        name="password"
        ref={register}
      />
      {errors.password && "password is required."}
      {/* <button
        type="button"
        onClick={() => {
          setValue("lastName", "luo"); // ✅
        }}
      ></button> */}
      <input type="submit" />
    </form>
  );
};
