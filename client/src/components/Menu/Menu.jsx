import React from "react";
import {
  TODAY_PATH,
  ALL_HABITS_PATH,
  EDIT_HABIT_PATH,
  DELETE_HABIT_PATH,
  CREATE_HABIT_PATH,
} from "../../utils/const";
import style from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const Menu = ({ habitId }) => {
  return (
    <div className={style.menu}>
      <div className={style.logo}></div>
      {habitId && (
        <div className={style.section}>
          <button className={style.menuItem}></button>
        </div>
      )}
      <div className={style.section}>
        <MenuItem to={TODAY_PATH}>Сегодня</MenuItem>
        <MenuItem to={ALL_HABITS_PATH}>Все привычки</MenuItem>
      </div>
      <div className={style.section}>
        {habitId ? (
          <>
            <MenuItem to={EDIT_HABIT_PATH} small>Редактировать привычку</MenuItem>
            <MenuItem to={DELETE_HABIT_PATH} small>Удалить привычку</MenuItem>
          </>
        ) : (
          <MenuItem to={CREATE_HABIT_PATH} small>Создать привычку</MenuItem>
        )}
      </div>
    </div>
  );
};

export default Menu;
