import React from "react";
import HabitBlock from "../HabitBlock/HabitBlock";
import style from "./ListHabit.module.scss";

const ListHabit = ({ staticHabit, habits, changeHabit }) => {
  if (!habits.length) return null;

  return (
    <div className={style.list}>
      {habits.map((habit) => (
        <HabitBlock
          key={habit.id}
          habit={habit}
          staticBlock={staticHabit}
          changeHabit={changeHabit}
        />
      ))}
    </div>
  );
};

export default ListHabit;
