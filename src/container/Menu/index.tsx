import React from 'react';
import MenuItem from './components/MenuItem';
import { menuLinks } from './constants';
import styles from './styled.module.scss';

const Menu = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menu__container}>
        {menuLinks.map(({ link, title }) => (
          <li key={link}>
            <MenuItem link={link}>{title}</MenuItem>
          </li>
        ))}
      </ul>
      <div className={styles.menu__container}>
        <MenuItem link="/account">Личный кабинет</MenuItem>
      </div>
    </div>
  );
};

export default Menu;
