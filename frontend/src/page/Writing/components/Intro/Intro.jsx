import React, { useState } from 'react';
import styles from './Intro.module.css';
import { useNavigate } from 'react-router';

export const Intro = ({onNext}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <p className={styles.text} style={{ fontSize: '32px', marginTop: '70px' }}>
          단계별 질문을 통하여, 손쉽게 유언장을 작성하세요.
        </p>
      </div>

      <div className={styles.totalBox}>
        <div className={styles.box2}>
          <div className={styles.navbar}>
            <img className={styles.line} alt="Line" src="line-1.svg" />

            <div className={styles.group1}>
              <div className={styles.overlapGroup}>
                <div className={styles.rectangle1} />
                <img className={styles.polygon} alt="Polygon" src="/images/polygon.svg" />
              </div>
            </div>
            <div className={styles.group1} style={{ left: '152px' }}>
              <div className={styles.overlapGroup}>
                <div className={styles.rectangle1} />
                <img className={styles.polygon} alt="Polygon" src="/images/polygon.svg" />
              </div>
            </div>
            <div className={styles.group1} style={{ left: '304px' }}>
              <div className={styles.overlapGroup}>
                <div className={styles.rectangle1} />
                <img className={styles.polygon} alt="Polygon" src="/images/polygon.svg" />
              </div>
            </div>
            <div className={styles.group1} style={{ left: '456px' }}>
              <div className={styles.overlapGroup}>
                <div className={styles.rectangle1} />
                <img className={styles.polygon} alt="Polygon" src="/images/polygon.svg" />
              </div>
            </div>
          </div>

          <div className={styles.group1} style={{ left: '608px' }}>
            <div className={styles.overlapGroup}>
              <div className={styles.rectangle1} />
              <img className={styles.polygon} alt="Polygon" src="/images/polygon.svg" />
            </div>
          </div>

          <div className={styles.group1} style={{ left: '760px' }}>
            <div className={styles.overlapGroup}>
              <div className={styles.rectangle1} />
              <img className={styles.polygon} alt="Polygon" src="/images/polygon.svg" />
            </div>
          </div>
          <div className={styles.numberText} style={{ left: '18px' }}>
            1
          </div>
          <div className={styles.numberText} style={{ left: '171px' }}>
            2
          </div>
          <div className={styles.numberText} style={{ left: '324px' }}>
            3
          </div>
          <div className={styles.numberText} style={{ left: '476px' }}>
            4
          </div>
          <div className={styles.numberText} style={{ left: '627px' }}>
            5
          </div>
          <div className={styles.numberText} style={{ left: '779px' }}>
            6
          </div>

          <div className={styles.progressText}>장례식</div>
          <div className={styles.progressText} style={{ left: '154px' }}>
            의료
          </div>
          <div className={styles.progressText} style={{ left: '280px' }}>
            상속 재산
          </div>
          <div className={styles.progressText} style={{ left: '458px' }}>
            유언
          </div>
          <div className={styles.progressText} style={{ left: '610px' }}>
            녹음
          </div>
          <div className={styles.progressText} style={{ left: '712px', width: '150px' }}>
            열람인 지정
          </div>
        </div>

        <div className={styles.tooltipContainer}>
          {/* 이미지 버튼 */}
          <img
            src="/images/QuestionMarkFill.svg"
            alt="버튼 이미지"
            className={styles.tooltipButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {isTooltipVisible && (
            <div className={styles.tooltipText}>
              작성한 내용을 바탕으로
              <br />
              녹음을 통해 법적효력이 있는 <br />
              블록체인 유언장을 생성합니다.
            </div>
          )}
        </div>

        <div className={styles.tooltipContainer} style={{ left:'365px', top:'-15px'}}>
          {/* 이미지 버튼 */}
          <img
            src="/images/QuestionMarkFill.svg"
            alt="버튼 이미지"
            className={styles.tooltipButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {isTooltipVisible && (
            <div className={styles.tooltipText}>
                내가 작성한 유언장의 내용을
              <br />볼 수 있는 사람을 지정합니다.
            </div>
          )}
        </div>

      </div>

      <div className={styles.blackbuttonContainer}>
        <button className={styles.blackbutton} onClick={() => onNext()}>
          <p className={styles.text} style={{ color: '#fff', fontSize: '28px' }}>
            유언장 작성하기
          </p>
        </button>
      </div>
    </div>
  );
};
