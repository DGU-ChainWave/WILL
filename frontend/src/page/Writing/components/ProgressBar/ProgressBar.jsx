import React from 'react';
import styles from './ProgressBar.module.css';

const steps = [
  {
    number: 1,
    text: '장례식',
  },
  {
    number: 2,
    text: '의료',
  },
  {
    number: 3,
    text: '상속 재산',
  },
  {
    number: 4,
    text: '유언',
  },
  {
    number: 5,
    text: '녹음',
  },
  {
    number: 6,
    text: '열람인 지정',
  },
];

export const ProgressBar = ({ step }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}> 유언장 작성하기</div>
        <img className={styles.line} alt="Line" src="/images/line.svg" />

        <div className={styles.stepAll_container}>
          {steps.map(item => (
            <div className={styles.step_container} key={item.number}>
              <div className={styles.numberBox} style={step === item.number ? { backgroundColor: '#2e2e30' } : {}}>
                <div className={styles.text} style={step === item.number ? { color: '#fff' } : {}}>
                  {item.number}
                </div>
              </div>
              {step === item.number ? (
                <img className={styles.polygon} alt="Polygon" src="/images/Polygon_smallBlack.svg" />
              ) : (
                <img className={styles.polygon} alt="Polygon" src="/images/Polygon_small.svg" />
              )}
              <div className={styles.text} style={{ marginTop: '6px' }}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
