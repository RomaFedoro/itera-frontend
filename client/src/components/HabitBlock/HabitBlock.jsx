import React from "react";
import style from "./HabitBlock.module.scss";

const HabitBlock = (props) => {
  return (
    <div className={style.block}>
      <div class="habit-block__title">{props.name}</div>
      <div class="habit-block__count-container">
        <div class="habit-block__count">2500</div>
        <div class="habit-block__count">ВЫПОЛНЕНО</div>
        <div class="habit-block__count">10 x 250&nbsp;ml</div>
        <button class="habit-block__count-brn">выполнить подход</button>
      </div>
    </div>
  );
};

export default HabitBlock;
