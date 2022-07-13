import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Menu.module.scss";

const MenuItem = ({ children, small, ...props }) => {
  const classes = ({ isActive }) => {
    const linkClasses = [style.menuItem];
    if (isActive) linkClasses.push(style.menuItemActive);
    if (small) linkClasses.push(style.menuItemSmall);
    return linkClasses.join(" "); 
  }
  
  return (
    <NavLink
      className={classes}
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default MenuItem;
