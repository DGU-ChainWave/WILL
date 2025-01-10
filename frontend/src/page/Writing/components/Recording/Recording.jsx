import React, { useCallback, useEffect, useState, useRef } from 'react';
import styles from './Recording.module.scss';
import { PageNavigation } from 'components';
import { ProgressBar } from '../ProgressBar';
import { useRecoilValue } from 'recoil';
import { UserState } from 'stores/login-store';

const mimeType = 'audio/mp3';

// 현재 시각을 서울을 기준으로 설정
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

export const Recording = ({ willData, onQClick, onNext }) => {
  const userState = useRecoilValue(UserState);
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.');
    }
  };

  const startRecording = async () => {
    setRecordingStatus('recording');
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = event => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus('inactive');
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      onQClick('audio', undefined, audioUrl);
      setAudioChunks([]);
    };
  };

  const updateWillNote = useCallback(() => {
    // 합칠 요소들을 줄바꿈 문자()으로 연결하여 will 변수에 할당
    const willNote = `${willData.funeral.selected}
  ${willData.funeral.note}
  ${willData.grave.selected}
  ${willData.grave.note}
  ${willData.lifeSupport.selected}
  ${willData.organDonation.selected}
  ${willData.inheritance.selected}
  ${willData.inheritance.note}
  ${willData.plus}`;

    onQClick('will', undefined, willNote);
  }, [willData]);

  useEffect(() => {
    getMicrophonePermission();
    updateWillNote();
  }, []);

  return (
    <>
      <ProgressBar step={5} />
      <div className={styles.container}>
        <div className={styles.info_container}>
          <div className={styles.title}>녹음하기</div>
          <div className={styles.text}>
            법적 효력이 있는 유언장을 저장하기 위해 작성해주신 유언장 내용을 바탕으로 녹음을 진행합니다.
          </div>
          <div className={styles.legal_effect_wrapper}>
            <img className={styles.legal_effect_img} src="/images/QuestionMark.svg" alt="question_mark" />
            법적 효력 안내
          </div>
        </div>
        <div className={styles.record_container}>
          <div
            className={
              permission && recordingStatus === 'recording'
                ? `${styles.record_img} ${styles.active}`
                : styles.record_img
            }
          />
          {recordingStatus === 'recording' ? (
            <div className={`${styles.record_button} ${styles.active}`} onClick={stopRecording}>
              녹음 완료하기
            </div>
          ) : (
            <div className={styles.record_button} onClick={startRecording}>
              녹음 시작하기
            </div>
          )}
          {(audio || willData.audio) && (
            <>
              <audio className={styles.audio} src={audio || willData.audio} type="audio/mp3" controls></audio>
              {/* <a download href={audio}>
                Download Recording
              </a> */}
              {/* <button onClick={handleSubmitIPFS}>Upload to IPFS</button>
              <a download href={'https://ipfs.io/ipfs/' + ipfsHash}>
                {'https://ipfs.io/ipfs/' + ipfsHash}
              </a> */}
            </>
          )}
          <div className={styles.record_information}>녹음이 시작되면 유언장 내용을 읽어주세요.</div>
          <div className={styles.record_information}>유언자의 증인은 유언장 내용의 마지막 문단을 읽어주세요.</div>
        </div>
        <div className={styles.will_textarea}>
          <div>
            저는 {userState.username}입니다. 오늘은 {year}년 {month}월 {date}일입니다. 저의 취지는 이 세상을 떠남으로써
            내 사랑과 감사를 표현하고, 내 가족과 사랑하는 모든 사람들에게 힘과 위로를 전하는 것입니다.
          </div>
          <br />
          <div>{willData.plus}</div>
          <br />
          <div>저는 {willData.funeral.selected}을 원합니다.</div>
          <div>{willData.funeral.note}</div>
          <br />
          <div>저는 {willData.grave.selected}을 원합니다.</div>
          <div>{willData.grave.note}</div>
          <br />
          <div>저는 {willData.lifeSupport.selected}</div>
          <br />
          <div>저는 {willData.organDonation.selected}</div>
          <br />
          <div>저는 {willData.inheritance.selected}을 원합니다.</div>
          <div>{willData.inheritance.note}</div>
          <br />
          <div>
            저는 유언자의 증인 ○○○입니다. 유언자 {userState.username}의 유언이 정확함을 확인합니다. 유언내용은{' '}
            {willData.funeral.selected}, {willData.grave.selected}, {willData.inheritance.selected}을 원한다는
            것입니다.
          </div>
        </div>
        <PageNavigation onNext={onNext} />
        <div className={styles.date_text}>
          작성일자 서기 {year}년 {month}월 {date}일
        </div>
      </div>
    </>
  );
};
