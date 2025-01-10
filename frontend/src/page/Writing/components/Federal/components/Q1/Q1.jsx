import React, { useState } from 'react';
import styles from './Q1.module.scss';
import { useRecoilState } from 'recoil';
import { WillState } from 'stores/will-store';

const funeralOptions = [
  {
    id: 1,
    title: '일반 3일장',
    content: '가족과 지인이 함께 했으면 좋겠어요.',
  },
  {
    id: 2,
    title: '가족장',
    content: '가족이랑만 장례를 치르고 싶어요.',
  },
  {
    id: 3,
    title: '무빈소 장례식',
    content: '빈소를 차리지 않고 간소하게 하고싶어요.',
  },
  {
    id: 4,
    title: '종교장',
    content: '제가 믿는 종교에 따라 진행하고 싶어요.',
  },
  {
    id: 5,
    title: '기타',
    content: '저만의 희망하는 장례방식이 있어요.',
  },
];

export const Q1 = () => {
  const [willState, setWillState] = useRecoilState(WillState);
  const [clickedOption, setClickedOption] = useState(''); // 클릭된 옵션 상태 추가
  const [comment, setComment] = useState(''); // 희망사항 상태 추가

  const handleOptionClick = option => {
    setClickedOption(option); // 클릭된 옵션 업데이트
    // WillState의 funeral 업데이트
    setWillState(prevWillState => ({
      ...prevWillState,
      funeral: {
        ...prevWillState.funeral,
        selected: option,
      },
    }));
  };

  const handleCommentChange = e => {
    const updatedComment = e.target.value;
    setComment(updatedComment);   
    setWillState(prevWillState => ({
      ...prevWillState,
      funeral: {
        ...prevWillState.funeral,
        note: updatedComment, // 희망사항 업데이트
      },
    }));
  };

  return (
    <div className={styles.root}>
      <div className={styles.q1_container}>
        <div className={styles.title}>질문1. 어떤 장례식을 원하시나요?</div>

        <div className={styles.q1Select_container}>
          {funeralOptions.map(option => (
            <button
              key={option.id}
              className={`${styles.selectBox} ${
                (clickedOption === option.title || willState.funeral.selected === option.title) && styles.clicked
              }`}
              onClick={() => handleOptionClick(option.title)}>
              <div className={styles.title_text}>{option.title}</div>
              <div className={styles.content_text}>{option.content}</div>
            </button>
          ))}
        </div>
        
        <textarea
          className={styles.hope_container}
          placeholder="희망사항을 남겨주세요"
          value={comment || willState.funeral.note}
          onChange={handleCommentChange}
        />
      </div>
    </div>
  );
};
