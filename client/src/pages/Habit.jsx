import React from "react";
import { useParams } from "react-router-dom";
import { setBackgr } from "../utils";

const Habit = () => {
  setBackgr(123);
  const params = useParams();

  return <div>Habit {params.id}</div>;
};

export default Habit;
