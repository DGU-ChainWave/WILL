import React, { useState } from 'react';
import styles from './Healthcare.module.css';

import { ProgressBar } from '../ProgressBar';
import { PageNavigation } from 'components';
import { Q3 } from './components/Q3';
import { Q4 } from './components/Q4';

export const Healthcare = ({ willData, onQClick, onNext }) => {
  return (
    <div className={styles.root}>
      <ProgressBar step={2} />
      <div className={styles.container}>
        <Q3 willData={willData} onQClick={onQClick} />
        <Q4 willData={willData} onQClick={onQClick} />
        <PageNavigation onNext={onNext} />
      </div>
    </div>
  );
};
