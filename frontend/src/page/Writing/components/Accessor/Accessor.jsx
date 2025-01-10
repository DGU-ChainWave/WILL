import React from 'react';
import styles from './Accessor.module.scss';
import Image from './component/순서도.PNG';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import moment from 'moment';

import { ProgressBar } from '../ProgressBar';
import { PageNavigation } from 'components';
import { ViewerGroup } from './component/Viewer';

export const Accessor = ({ willData, onQClick, onNext }) => {
  const selectedDate = moment(willData.openDate).toDate('yyyy년 MM월 dd일');

  const handleDateChange = date => {
    onQClick('openDate', undefined, date);
  };

  return (
    <div className={styles.root}>
      <ProgressBar step={6} />
      <div className={styles.container}>
        <div className={styles.info_container}>
          <div className={styles.title}>열람인 지정</div>
          <div className={styles.text}>나의 유언장을 볼 수 있는 열람인을 지정합니다</div>
        </div>
        <ViewerGroup />
        <div className={styles.bottomcontainer}>
          <p className={styles.Open}>유언장 개봉일 : </p>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            className={styles.date}
          />
        </div>
        <img src={Image} alt="nextPage" className={styles.imgStyle} />
        <PageNavigation onNext={onNext} />
      </div>
    </div>
  );
};
