import React, { useState } from 'react';
import styles from './Q3.module.css';
import { useRecoilState } from 'recoil';
import { Option } from 'components';
import { WillState } from 'stores/will-store';

const lifeSupportOptions = [
  {
    id: 1,
    title: '연명치료를 원합니다.',
  },
  {
    id: 2,
    title: '연명치료를 원하지 않습니다.',
  },
];

export const Q3 = () => {
  const [willState, setWillState] = useRecoilState(WillState);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = option => {
    setSelectedOption(option);
    setWillState(prevWillState => ({
      ...prevWillState,
      lifeSupport: {
        ...prevWillState.lifeSupport,
        selected: option,
      },
    }));
  };

  return (
    <div className={styles.root}>
      <div className={styles.q3_container}>
        <div className={styles.title}>질문3. 연명치료에 대해 결정된 사항이 있나요?</div>

        <div className={styles.q3Select_container}>
          {lifeSupportOptions.map(option => (
            <Option
              key={option.id}
              onClick={() => handleOptionClick(option.title)}
              active={selectedOption === option.title || willState.lifeSupport.selected === option.title}>
              {option.title}
            </Option>
          ))}
        </div>
        <div className={styles.banner_container}>
          <div className={styles.banner_box}>
            <img className={styles.image} alt="Image" src="images/Q3_banner.png" />
            <p className={styles.text}>
              연명치료를 원하지 않는시다면, <br />
              전국 보건소에서 연명치료 거부 신청을 할 수 있습니다.
            </p>
            <button className={styles.findHealthCenter_button}>보건소 찾기 {'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
