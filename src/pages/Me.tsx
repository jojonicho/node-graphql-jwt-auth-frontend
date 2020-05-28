import React from "react";
import { useMeQuery } from "../generated/graphql";

interface MeProps {}

export const Me: React.FC<MeProps> = ({}) => {
  const { data, error, loading } = useMeQuery();
  const Container = loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>err</div>
  ) : data ? (
    <div>{data.me}</div>
  ) : (
    <div>No data</div>
  );
  return Container;
};
