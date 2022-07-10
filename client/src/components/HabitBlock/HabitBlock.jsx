import React from "react";
import { useState, useMemo } from "react";
import style from "./HabitBlock.module.scss";

const HabitBlock = (props) => {
  const [isActive, setActive] = useState(false);
  const [leftStep, setLeftStep] = useState(props.total - props.done);

  const isCompleted = useMemo(() => leftStep <= 0, [leftStep]);
  const isLastStep = useMemo(() => leftStep === 1, [leftStep]);

  const classes = useMemo(() => {
    return [
      style.block, 
      isActive && style.blockActive,
      isCompleted && style.blockCompleted
    ].filter(item => item).join(" ");
  }, [isActive, isCompleted]);

  return (
    <div
      className={classes}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className={style.title}>{props.name}</div>
      <div className={style.body}>
        <div className={style.count}>{leftStep * props.repeat || "ВЫПОЛНЕНО"}</div>
        {!isCompleted && (
          <button
            className={style.button}
            onClick={() => setLeftStep(leftStep - 1)}
          >
            {isLastStep ? "закончить" : "выполнить"}
          </button>
        )}
      </div>
    </div>
  );
};

export default HabitBlock;
