import React, { useState } from 'react';
import styles from './Q4.module.css';
import { useRecoilState } from 'recoil';
import { WillState } from 'stores/will-store';
import { Option } from 'components';

const organDonationOptions = [
  {
    id: 1,
    title: '장기기증을 신청하였습니다.',
  },
  {
    id: 2,
    title: '장기기증을 신청하지 않았습니다.',
  },
];

export const Q4 = ({willData, onQClick}) => {
  const [clickedOption, setClickedOption] = useState('');

  const handleOptionClick = option => {
    setClickedOption(option); // 클릭된 버튼의 값을 저장
    onQClick('organDonation', 'selected', option);
  };

  return (
    <div className={styles.root}>
      <div className={styles.q4_container}>
        <div className={styles.title}>질문4. 장기기증을 신청하셨나요?</div>

        <div className={styles.q4Select_container}>
          {organDonationOptions.map(option => (
            <Option
              key={option.id}
              onClick={() => handleOptionClick(option.title)}
              active={clickedOption === option.title || willData.organDonation.selected === option.title}>
              {option.title}
            </Option>
          ))}
        </div>

        <div className={styles.banner_container}>
          <div className={styles.banner_box}>
            <p className={styles.text}>
              장기기증에 대한 의향이 있으신가요?
              <br />
              장기기증 신청하기 버튼을 통해 신청할 수 있습니다.
            </p>
            <button className={styles.findHealthCenter_button}>장기기증 신청하기 {'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
