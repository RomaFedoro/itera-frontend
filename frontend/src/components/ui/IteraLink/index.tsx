import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Link from 'next/link';

type TLinkProps = {
  href: string;
  children: React.ReactNode;
};

const IteraLink = ({ children, href }: TLinkProps) => {
  return (
    <Link className={cn(styles.link, 'form-element')} href={href}>
      {children}
    </Link>
  );
};

export default IteraLink;
