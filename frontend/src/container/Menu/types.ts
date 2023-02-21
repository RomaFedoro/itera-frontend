import { ForwardRefExoticComponent, SVGProps } from 'react';

export type TMenuLink = {
  link: string;
  title: string;
  Icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
};
