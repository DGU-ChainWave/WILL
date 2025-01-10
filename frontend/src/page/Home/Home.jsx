import React, { useState } from 'react';
import styles from './Home.module.css';
import { Lawyer } from './Lawyer';
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 버튼 클릭 시 이동만 처리한 후 이벤트를 중지합니다.
    return false;
  };
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.image1}>
          <p
            className={styles.text}
            style={{
              marginTop: '194px',
              textShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
              position: 'absolute',
            }}>
            블록체인 유언장 법률 커뮤니티 별세(別世)
          </p>
          <p
            className={styles.text}
            style={{
              fontSize: '68px',
              fontWeight: '700',
              marginTop: '230px',
              textShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
              position: 'absolute',
            }}>
            당신의 유언장을 남겨보세요.
          </p>
          <Link to="./writing">
            <button onClick={handleClick} className={styles.button} style={{ marginTop: '405px' }}>
              <p className={styles.text} style={{ fontSize: '28px', fontWeight: '700', color: '#000' }}>
                유언장 작성하기
              </p>
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.container} style={{ background: '#F4F4F4', height: '470px' }}>
        <p
          className={styles.text}
          style={{
            color: '#2E2E30',
            fontSize: '32px',
            fontWeight: '700',
            paddingTop: '35px',
          }}>
          현재 12,203,566개의 유언장이 보관되었습니다.
        </p>
        <p
          className={styles.text}
          style={{
            color: '#898394',
            fontSize: '24px',
            fontWeight: '400',
          }}>
          저장된 유언장은 블록체인 기술을 통해
          <br />
          타인에 의해 훼손되지 않고 안전하게 보관됩니다.
        </p>
        <div className={styles.illust}>image</div>
      </div>

      <div className={styles.container} style={{ height: '988px', padding: '147px 197px' }}>
        <p
          className={styles.text}
          style={{
            color: '#2E2E30',
            fontWeight: '700',
            fontSize: '32px',
            marginBottom: '60px',
          }}>
          별세와 함께 상속과 관련한
          <br />
          법률적 고민을 해결하세요.
        </p>
        <div className={styles.lawyerContainer}>
          <Lawyer index={0} />
          <Lawyer index={1} />
          <Lawyer index={2} />
          <Lawyer index={3} />
        </div>
        <Link to="./LawyerMain">
          <button className={styles.button} style={{ background: '#000', marginTop: '80px' }}>
            <p className={styles.text} style={{ fontSize: '28px', fontWeight: '700', color: '#fff' }}>
              변호사 알아보기
            </p>
          </button>
        </Link>
        <p className={styles.text} style={{ color: '#898394' }}>
          블록체인과 녹음 방식을 통해
          <br />
          <span className={styles.text} style={{ color: '#898394', fontWeight: '700' }}>
            법적 효력이 있는 온라인 유언장
          </span>
          을 제공합니다.
        </p>
      </div>

      <div className={styles.image2}>
        <p
          className={styles.text}
          style={{ fontSize: '32px', fontWeight: '700', position: 'absolute', marginTop: '137px' }}>
          유언장을 찾지 못하셨나요?
          <br />
          가족의 유언장이 보관되어있는지 확인해보세요.
        </p>
        <p
          className={styles.text}
          style={{ fontSize: '24px', fontWeight: '500', position: 'absolute', marginTop: '251px', color: '#F4F4F4' }}>
          전달 받은 보안코드를 통해 유언장을 찾으실 수 있습니다.
        </p>
        <Link to="./Searching">
          <button className={styles.button} style={{ marginTop: '350px' }} onClick={() => navigate('/searching')}>
            <p className={styles.text} style={{ fontSize: '28px', fontWeight: '700', color: '#000' }}>
              유언장 찾기
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
};
