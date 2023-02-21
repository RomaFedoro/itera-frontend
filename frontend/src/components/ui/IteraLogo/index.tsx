import React from 'react';
import styles from './style.module.scss';
import logoSrc from '@@/public/logo.svg';
import Image from 'next/image';

const IteraLogo = () => {
  return (
    <div className={styles.logo}>
      <Image priority src={logoSrc} alt="Logo" />
    </div>
  );
};

export default IteraLogo;
