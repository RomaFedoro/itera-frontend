import React from "react";
import { useState, useMemo } from "react";
import style from "./HabitBlock.module.scss";
import { getColor } from "../../utils";
import { DEFAULT_HABIT_COLOR } from "../../utils/const";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const HabitBlock = ({ staticBlock, changeHabit, habit }) => {
  const BACKGR_COLOR = getColor(habit.color ?? DEFAULT_HABIT_COLOR);

  const [doneStep, setDoneStep] = useState(habit.done);

  useEffect(() => changeHabit({ ...habit, done: doneStep }), [doneStep, habit, changeHabit]);

  const [isActive, setActive] = useState(false);

  const leftStep = useMemo(
    () => (staticBlock ? habit.total : habit.total - doneStep),
    [doneStep, staticBlock, habit.total]
  );
  const isCompleted = useMemo(() => leftStep <= 0, [leftStep]);
  const isLastStep = useMemo(() => leftStep === 1, [leftStep]);

  const classes = useMemo(() => {
    return [
      style.block,
      isActive && style.blockActive,
      isCompleted && style.blockCompleted,
    ]
      .filter((item) => item)
      .join(" ");
  }, [isActive, isCompleted]);

  const styles = useMemo(() => {
    if (isActive && !isCompleted) return { backgroundColor: BACKGR_COLOR };
    return {};
  }, [BACKGR_COLOR, isActive, isCompleted]);

  const countString = useMemo(() => {
    if (isCompleted) return "ВЫПОЛНЕНО";
    const count = leftStep * habit.repeat;
    const unit = habit.unit ?? "ones";

    if (isActive) {
      if (count <= 1) return null;
      if (leftStep === 1) return `${habit.repeat} ${unit}`;
      if (habit.repeat === 1) return `${leftStep} ${unit}`;
      return `${habit.repeat} x ${leftStep} ${unit}`;
    } else {
      return count > 1 ? leftStep * habit.repeat : null;
    }
  }, [leftStep, isActive, isCompleted, habit.repeat, habit.unit]);

  return (
    <div
      className={classes}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={styles}
    >
      <Link to={"/habit/" + habit.id} className={style.link}></Link>
      <div className={style.title}>{habit.name}</div>
      <div className={style.body}>
        <div className={style.count}>{countString}</div>
        {!(isCompleted || staticBlock) && (
          <button
            className={style.button}
            onClick={() => setDoneStep(doneStep + 1)}
          >
            {isLastStep ? "закончить" : "выполнить"}
          </button>
        )}
      </div>
    </div>
  );
};

export default HabitBlock;
