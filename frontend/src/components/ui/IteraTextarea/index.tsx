'use client';

import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import useAutosizeTextArea from './useAutosizeTextArea';

type TTextareaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {};

const IteraTextarea = React.forwardRef<HTMLTextAreaElement, TTextareaProps>(
  ({ className, ...rest }, ref) => {
    // const [value, setValue] = useState('');
    // const textAreaRef = useRef<HTMLTextAreaElement | null>(ref);

    // useAutosizeTextArea(textAreaRef.current, value);

    // const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   const val = evt.target?.value;
    //   setValue(val);
    // };

    return (
      <textarea
        ref={ref}
        className={cn(className, styles.textarea)}
        rows={1}
        {...rest}
      ></textarea>
    );
  }
);
IteraTextarea.displayName = 'IteraTextarea';

export default IteraTextarea;
