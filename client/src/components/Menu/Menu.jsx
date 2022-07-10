import React from "react";
import style from "./Menu.module.scss";

const Menu = ({ habitId }) => {
  return (
    <div className={style.menu}>
      <div className={style.logo}></div>
      {habitId && (
        <div className={style.section}>
          <button class="menu-btn"></button>
        </div>
      )}
      <div className={style.section}>
        <button class="menu-btn">Сегодня</button>
        <button class="menu-btn">Все привычки</button>
      </div>
      <div className={style.section}>
        {habitId ? (
          <>
            <button class="menu-btn small-menu-btn">
              Редактировать привычку
            </button>
            <button class="menu-btn small-menu-btn">Удалить привычку</button>
          </>
        ) : (
          <button class="menu-btn small-menu-btn">Создать привычку</button>
        )}
      </div>
    </div>
  );
};

export default Menu;
