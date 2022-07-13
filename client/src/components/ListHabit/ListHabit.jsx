import React from "react";
import HabitBlock from "../HabitBlock/HabitBlock";
import style from "./ListHabit.module.scss";

const ListHabit = ({ staticHabit, habits }) => {
  return (
    <div className={style.list}>
      {habits.map((habit) => (
        <HabitBlock key={habit.id} {...habit} staticBlock={staticHabit} />
      ))}
    </div>
  );
};

export default ListHabit;
