import React from "react";
import ListHabit from "../../components/ListHabit/ListHabit";
// import style from "./Today.module.scss";

const Today = (props) => {
  const habits = [
    { id: 1, name: "Попить водки 1", done: 0, repeat: 100, total: 4 },
    { id: 2, name: "Попить водки 2", done: 0, repeat: 200, total: 1 },
    { id: 3, name: "Попить водки 3", done: 0, repeat: 1000, total: 10 },
    { id: 4, name: "Попить водки 4", done: 0, repeat: 100, total: 2 },
  ];

  return (
    <>
      <ListHabit habits={habits}></ListHabit>
      <ListHabit habits={habits}></ListHabit>
    </>
  );
};

export default Today;
