import React from 'react';
import styles from './Completed.module.css';
import { Link } from 'react-router-dom';

export const Completed = () => {
  return (
    <div className={styles.container}>
      <p className={styles.textBig} style={{ marginTop: '150px' }}>
        유언장 작성이 완료되었습니다
      </p>
      <p className={styles.text} style={{ marginTop: '0px' }}>
        작성하신 유언장은{' '}
        <span className={styles.text} style={{ fontWeight: '500' }}>
          마이페이지
        </span>
        에서
        <br />
        확인 및 수정이 가능합니다.
      </p>
      <img width="252px" height="170px" marginTop="27px" src="CreatWill.svg" />
      <Link to="/MyPage">
        <button className={styles.button}>
          <span className={styles.buttonText}>확인하러 가기</span>
        </button>
      </Link>
    </div>
  );
};
