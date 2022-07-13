import React from "react";
import ListHabit from "../components/ListHabit/ListHabit";
import { setBackgr } from "../utils";
import { getTodayDate } from "../utils/date";

const Today = (props) => {
  setBackgr();
  const todayDate = getTodayDate();

  //TODO: Backend and useEffect, also list separation
  const habits = [
    {
      id: 1,
      name: "Попить водки 1",
      done: 0,
      repeat: 100,
      total: 4,
      color: 12,
    },
    {
      id: 2,
      name: "Попить водки 2",
      done: 0,
      repeat: 200,
      total: 1,
      color: 123,
    },
    {
      id: 3,
      name: "Попить водки 3",
      done: 0,
      repeat: 1000,
      total: 10,
      color: 312,
    },
    {
      id: 4,
      name: "Попить водки 4",
      done: 0,
      repeat: 100,
      total: 2,
      color: 212,
    },
  ];

  return (
    <div className="workspace">
      <header className="title">
        {todayDate.format("DD.MM")}
        <div className="title__description">{todayDate.format("dd")}</div>
      </header>
      <ListHabit habits={habits}></ListHabit>
      <ListHabit habits={habits}></ListHabit>
    </div>
  );
};

export default Today;
