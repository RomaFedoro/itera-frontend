'use client';

import React, { useMemo } from 'react';
import MenuItem from './components/MenuItem';
import { usePathname } from 'next/navigation';
import { menuLinks } from './constants';
import styles from './styled.module.scss';

const Menu = () => {
  const pathname = usePathname();
  const isAuthPage = useMemo(() => pathname?.startsWith('/auth'), [pathname]);

  return (
    <div className={styles.menu}>
      <ul className="list">
        {!isAuthPage &&
          menuLinks.map(({ link, title }) => (
            <li key={link}>
              <MenuItem link={link} isActive={pathname === link}>
                {title}
              </MenuItem>
            </li>
          ))}
      </ul>
      {!isAuthPage && (
        <div className="list">
          <MenuItem link="/account">Личный кабинет</MenuItem>
        </div>
      )}
    </div>
  );
};

export default Menu;
