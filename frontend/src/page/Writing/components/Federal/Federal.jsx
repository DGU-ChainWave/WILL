import React from 'react';
import styles from './Federal.module.css';

import { ProgressBar } from '../ProgressBar';
import { PageNavigation } from 'components';
import { Q1 } from './components/Q1';
import { Q2 } from './components/Q2';

export const Federal = ({willData, onQClick, onNext}) => {
  return (
    <div className={styles.root}>
      <ProgressBar step={1} />
      <div className={styles.container}>
        <Q1 willData={willData} onQClick={onQClick} />
        <Q2 willData={willData} onQClick={onQClick} />
        <PageNavigation onNext={onNext} />
      </div>
    </div>
  );
};
