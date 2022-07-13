import React from "react";
import { useState, useMemo } from "react";
import style from "./HabitBlock.module.scss";
import { getColor } from "../../utils";
import { DEFAULT_HABIT_COLOR } from "../../utils/const";
import { Link } from "react-router-dom";

const HabitBlock = ({ staticBlock, ...props }) => {
  const BACKGR_COLOR = getColor(props.color ?? DEFAULT_HABIT_COLOR);

  const [isActive, setActive] = useState(false);
  const [leftStep, setLeftStep] = useState(
    staticBlock ? props.total : props.total - props.done
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
    const count = leftStep * props.repeat;
    const unit = props.unit ?? "ones";

    if (isActive) {
      if (count <= 1) return null;
      if (leftStep === 1) return `${props.repeat} ${unit}`;
      if (props.repeat === 1) return `${leftStep} ${unit}`;
      return `${props.repeat} x ${leftStep} ${unit}`;
    } else {
      return count > 1 ? leftStep * props.repeat : null;
    }
  }, [leftStep, isActive, isCompleted, props.repeat, props.unit]);

  return (
    <div
      className={classes}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={styles}
    >
      <Link to={'/habit/' + props.id} className={style.link}></Link>
      <div className={style.title}>{props.name}</div>
      <div className={style.body}>
        <div className={style.count}>{countString}</div>
        {!(isCompleted || staticBlock) && (
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
