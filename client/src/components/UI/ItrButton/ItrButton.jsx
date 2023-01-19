import React from 'react';
import style from './ItrButton.module.css';

const ItrButton = ({children, ...props}) => {
    return (
        <button {...props} className={style.itrButton}>
            {children}
        </button>
    );
};

export default ItrButton;