'use client';

import React, { useMemo } from 'react';
import MenuItem from './components/MenuItem';
import { usePathname } from 'next/navigation';
import { accountLink, menuLinks } from './constants';
import styles from './styled.module.scss';
import IteraLogo from '@/components/ui/IteraLogo';

const Menu = () => {
  const pathname = usePathname();
  const isAuthPage = useMemo(() => pathname?.startsWith('/auth'), [pathname]);

  return (
    <div className={styles.menu}>
      <ul className="list">
        <IteraLogo />
        {!isAuthPage &&
          menuLinks.map(({ link, title, Icon }) => (
            <li key={link}>
              <MenuItem link={link} isActive={pathname === link}>
                {Icon && <Icon />}
                {title}
              </MenuItem>
            </li>
          ))}
      </ul>
      {!isAuthPage && (
        <div className="list">
          <MenuItem
            link={accountLink.link}
            isActive={pathname === accountLink.link}
          >
            {accountLink.Icon && <accountLink.Icon />}
            {accountLink.title}
          </MenuItem>
        </div>
      )}
    </div>
  );
};

export default Menu;
