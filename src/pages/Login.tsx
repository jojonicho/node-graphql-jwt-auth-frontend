import React from "react";
import { useForm } from "react-hook-form";
import {
  // useRegisterMutation,
  useLoginMutation,
  MeDocument,
  MeQuery,
} from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";

type FormData = {
  email: string;
  password: string;
};

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const [login] = useLoginMutation();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    const response = await login({
      variables: {
        email,
        password,
      },
      // cache
      update: (store, { data }) => {
        if (!data) return null;
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data.login.user,
          },
        });
      },
    });
    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
    }
    history.push("/");
    console.log(response);
  });
  return (
    <form onSubmit={onSubmit}>
      <label>email</label>
      <input name="email" placeholder="email" ref={register} />
      {errors.email && "email is required."}
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
