import React from "react";
import { useState, useMemo } from "react";
import ListHabit from "../components/ListHabit/ListHabit";
import { setBackgr } from "../utils";
import { getTodayDate } from "../utils/date";

const Today = () => {
  setBackgr();
  const todayDate = getTodayDate();

  const [habits, setHabits] = useState([
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
  ]);

  const useHabits = (habit) => {
    const index = habits.findIndex((el) => el.id === habit.id);
    console.log(index);
    const newHabits = habits.slice();
    newHabits[index] = { ...habit };
    console.log(newHabits);
    setHabits(newHabits);
  };

  const unfulfilledHabits = useMemo(
    () => habits.filter((habit) => habit.done !== habit.total),
    [habits]
  );

  const fulfilledHabits = useMemo(
    () => habits.filter((habit) => habit.done === habit.total),
    [habits]
  );

  return (
    <div className="workspace">
      <header className="title">
        {todayDate.format("DD.MM")}
        <div className="title__description">{todayDate.format("dd")}</div>
      </header>
      <ListHabit habits={unfulfilledHabits} changeHabit={useHabits}></ListHabit>
      <ListHabit habits={fulfilledHabits} changeHabit={useHabits}></ListHabit>
    </div>
  );
};

export default Today;
