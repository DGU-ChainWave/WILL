import React, { useState } from 'react';
import styles from './Healthcare.module.css';

import { ProgressBar } from '../ProgressBar';
import { PageNavigation } from 'components';
import { Q3 } from './components/Q3';
import { Q4 } from './components/Q4';

export const Healthcare = () => {
  return (
    <div className={styles.root}>
      <ProgressBar step={2} />
      <div className={styles.container}>
        <Q3 />
        <Q4 />
        <PageNavigation nextPath="/writing4" />
      </div>
    </div>
  );
};
