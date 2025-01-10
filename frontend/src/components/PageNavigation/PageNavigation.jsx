import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PageNavigation.module.css';

export const PageNavigation = ({ onNext }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button
        className={styles.previous_button}
        onClick={() => {
          navigate(-1);
        }}>
        이전으로
      </button>
      <button
        className={styles.next_button}
        onClick={() => onNext()}>
        다음으로
      </button>
    </div>
  );
};
