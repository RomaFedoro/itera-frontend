import React from "react";
import HabitBlock from "../HabitBlock/HabitBlock";
import style from "./ListHabit.module.scss";

const ListHabit = ({ habits }) => {
  return (
    <div className={style.list}>
      {habits.map((habit) => (
        <HabitBlock key={habit.id} {...habit} />
      ))}
    </div>
  );
};

export default ListHabit;
