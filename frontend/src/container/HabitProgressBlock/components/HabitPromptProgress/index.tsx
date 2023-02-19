import React, { memo } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

type THabitPromptProgress =
  | {
      isPromptHidden: true;
      promptPosition?: undefined;
      promptDate?: undefined;
      promptText?: undefined;
    }
  | {
      isPromptHidden: false;
      promptPosition: {
        left: number;
        top: number;
      };
      promptDate: string;
      promptText: string;
    };

const HabitPromptProgress = ({
  isPromptHidden,
  promptPosition,
  promptDate,
  promptText,
}: THabitPromptProgress) => {
  return (
    <div
      className={cn(styles.prompt, isPromptHidden && styles.prompt_hide)}
      style={promptPosition}
    >
      {!isPromptHidden && (
        <>
          <div className={styles.prompt__date}>{promptDate}</div>
          <div className={styles.prompt__description}>{promptText}</div>
        </>
      )}
    </div>
  );
};

export default memo(HabitPromptProgress);
