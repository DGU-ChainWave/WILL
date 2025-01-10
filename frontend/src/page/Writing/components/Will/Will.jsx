import React, { useState } from 'react';
import styles from './Will.module.css';
import { ProgressBar } from '../ProgressBar';
import { PageNavigation } from 'components';
import { useRecoilState } from 'recoil';
import { WillState } from 'stores/will-store';

export const Will = ({ willData, onQClick, onNext }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = e => {
    const updatedComment = e.target.value;
    setComment(updatedComment);
    onQClick('plus', undefined, updatedComment);
  };

  return (
    <div className={styles.root}>
      <ProgressBar step={4} />
      <div className={styles.container}>
        <div className={styles.info_container}>
          <div className={styles.title}>유언장 작성하기</div>
          <div className={styles.text}>전하고 싶은, 전하지 못했던, 남기고 싶은 말씀을 적어보세요. </div>
          <textarea
            className={styles.hope_container}
            placeholder="텍스트를 입력해주세요"
            value={comment || willData.plus}
            onChange={handleCommentChange}
          />
        </div>
        <div style={{ marginTop: '140px', marginBottom: '40px' }}>
          <PageNavigation onNext={onNext} />
        </div>
      </div>
    </div>
  );
};
