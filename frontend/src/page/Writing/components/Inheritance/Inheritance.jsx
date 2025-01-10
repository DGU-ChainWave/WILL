import React, { useState } from 'react';
import styles from './Inheritance.module.css';

import { ProgressBar } from '../ProgressBar';
import { PageNavigation } from 'components';
import { useRecoilState } from 'recoil';
import { Option } from 'components';
import { WillState } from 'stores/will-store';

const inheritanceOptions = [
  {
    id: 1,
    title: '법정상속',
  },
  {
    id: 2,
    title: '유언상속',
  },
];

export const Inheritance = () => {
  const [willState, setWillState] = useRecoilState(WillState);
  const [selectedOption, setSelectedOption] = useState('');
  const [comment, setComment] = useState('');

  const handleOptionClick = option => {
    setSelectedOption(option);
    setWillState(prevWillState => ({
      ...prevWillState,
      inheritance: {
        ...prevWillState.inheritance,
        selected: option,
      },
    }));
  };

  const handleCommentChange = e => {
    const updatedComment = e.target.value;
    setComment(updatedComment);
    setWillState(prevWillState => ({
      ...prevWillState,
      inheritance: {
        ...prevWillState.inheritance,
        note: updatedComment,
      },
    }));
  };
  return (
    <div className={styles.root}>
      <ProgressBar step={3} />
      <div className={styles.container}>
        <div className={styles.info_container}>
          <div className={styles.title}>상속 관계 정리서</div>
          <div className={styles.text}>민법상 유산으로 인정되는 재산목록과 상속인을 작성해주세요. </div>
          <div className={styles.legal_effect_wrapper}>
            <img className={styles.legal_effect_img} src="/images/QuestionMark.svg" alt="question_mark" />
            법적 효력 안내
          </div>
        </div>

        <div className={styles.inheritance_container}>
          {inheritanceOptions.map(option => (
            <Option
              key={option.id}
              onClick={() => handleOptionClick(option.title)}
              active={selectedOption === option.title || willState.inheritance.selected === option.title}>
              {option.title}
            </Option>
          ))}
        </div>

        {(selectedOption || willState.inheritance.selected) === '유언상속' && (
          <div className={styles.info_container}>
            <p className={styles.text} style={{ fontSize: '18px', color: '#898394' }}>
              상속관계 유언 예시
            </p>
            <p className={styles.text} style={{ fontSize: '18px', color: '#898394' }}>
              구체적인 금액으로 작성 : OOO의 재산 1000만원을 △△△에게 상속한다.
              <br />
              비율로 작성 : OOO의 재산 40%를 △△△에게 상속한다.
              <br />
              구체적인 주소 작성 : 서울특별시 중구 필동로 1길 30 의 아파트는 아들인 △△△한테 상속한다.
            </p>

            <textarea
              className={styles.hope_container}
              placeholder="텍스트를 입력해주세요"
              value={comment || willState.inheritance.note}
              onChange={handleCommentChange}
            />
          </div>
        )}

        <div style={{ marginTop: '100px', marginBottom: '60px' }}>
          <PageNavigation nextPath="/writing5" />
        </div>
      </div>
    </div>
  );
};
