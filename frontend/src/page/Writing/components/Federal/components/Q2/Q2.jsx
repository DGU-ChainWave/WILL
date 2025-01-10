import React, { useState } from 'react';
import styles from './Q2.module.scss';

const graveOptions = [
  {
    id: 1,
    title: '매장묘',
    src: '/images/q2-1.png',
    content: '전통 방식대로 터에 묻히길 원해요.',
  },
  {
    id: 2,
    title: '봉안묘',
    src: '/images/q2-2.png',
    content: '화장 후 실외 시설물에 안치되길 원해요.',
  },
  {
    id: 3,
    title: '납골당',
    src: '/images/q2-3.png',
    content: '화장 후 실내 시설물에 안치되길 원해요.',
  },
  {
    id: 4,
    title: '수목장',
    src: '/images/q2-4.png',
    content: '화장 후 나무 아래 안치되길 원해요.',
  },
  {
    id: 5,
    title: '잔디장',
    src: '/images/q2-5.png',
    content: '화장 후 잔디 아래 묻히길 원해요.',
  },
  {
    id: 6,
    title: '기타',
    src: '/images/q2-6.png',
    content: '저만의 원하는 방식이 따로 있어요.',
  },
];

export const Q2 = ({ willData, onQClick }) => {
  const [clickedOption, setClickedOption] = useState(''); // 클릭된 옵션 상태 추가
  const [comment, setComment] = useState(''); // 희망사항 상태 추가

  const handleOptionClick = option => {
    setClickedOption(option); // 클릭된 옵션 업데이트
    // WillState의 funeral 업데이트
    onQClick('grave', 'selected', option);
  };

  const handleCommentChange = e => {
    const updatedComment = e.target.value;
    setComment(updatedComment);
    onQClick('grave', 'note', updatedComment);
  };

  return (
    <div className={styles.root}>
      <div className={styles.q2_container}>
        <div className={styles.title}>질문2. 원하시는 묘는 무엇인가요?</div>

        <div className={styles.q2Select_container}>
          {graveOptions.map(option => (
            <button
              key={option.id}
              className={`${styles.selectBox} ${
                (clickedOption === option.title || willData.grave.selected === option.title) && styles.clicked
              }`}
              onClick={() => handleOptionClick(option.title)}>
              <div className={styles.title_text}>{option.title}</div>
              <img src={option.src} alt={option.title} />
              <div className={styles.content_text}>{option.content}</div>
            </button>
          ))}
        </div>
        <textarea
          className={styles.hope_container}
          placeholder="희망사항을 남겨주세요"
          value={comment || willData.grave.note}
          onChange={handleCommentChange}
        />
      </div>
    </div>
  );
};
