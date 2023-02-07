import React from 'react';
import MenuItem from './components/MenuItem';
import { menuLinks } from './constants';
import styles from './styled.module.scss';

const Menu = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menu__container}>
        {menuLinks.map((menuLink) => (
          <li key={menuLink.link}>
            <MenuItem {...menuLink} />
          </li>
        ))}
      </ul>
      <div className={styles.menu__container}></div>
    </div>
  );
};

export default Menu;
