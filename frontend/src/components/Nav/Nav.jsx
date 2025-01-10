import React, { useEffect, useMemo } from 'react';
import styles from './Nav.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { UserState, LoginState } from '../../stores/login-store';

export const Nav = () => {
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const setUserState = useSetRecoilState(UserState);
  let token = useMemo(() => localStorage.getItem('token'), []);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleLogout = () => {
    // 로그아웃할건지 물어보기
    if (!window.confirm('로그아웃 하시겠습니까?')) return;

    // 로그아웃 로직 수행 후 LoginState atom 값을 false로 변경
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    setUserState({
      _id: '',
      username: '',
      email: '',
      password: '',
      createdAt: '',
      updatedAt: '',
      bookmarkedQuestions: [],
    });
    setLoginState(false);
  };

  useEffect(() => {
    const expirationDate = localStorage.getItem('expirationDate');
    if (expirationDate) {
      const currentDate = new Date().getTime();
      const ComExpirationDate = new Date(expirationDate).getTime();
      const timeGap = ComExpirationDate - currentDate;

      if (timeGap > 0) {
        const timeout = setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('expirationDate');
          token = null;
          setUserState({
            _id: '',
            username: '',
            email: '',
            password: '',
            createdAt: '',
            updatedAt: '',
            bookmarkedQuestions: [],
          });
          setLoginState(false);
        }, timeGap);

        return () => {
          clearTimeout(timeout);
        };
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        token = null;
        setUserState({
          _id: '',
          username: '',
          email: '',
          password: '',
          createdAt: '',
          updatedAt: '',
          bookmarkedQuestions: [],
        });
        setLoginState(false);
      }
    }
    // console.log(localStorage.getItem('token'));
    // console.log(loginState);
  }, [token]);

  return (
    <header className={styles.nav}>
      <p
        className={styles.text}
        style={{
          fontSize: '28px',
          color: '#000',
          marginLeft: '58px',
        }}
        onClick={() => navigate('/')}>
        별세
        <span className={styles.text} style={{ fontSize: '25px', padding: '0px 0px', color: '#000' }}>
          (別世)
        </span>
      </p>
      <div className={styles.bannerContainer}>
        <p className={`${styles.text} ${location === '/' && styles.selected_text}`} onClick={() => navigate('/')}>
          서비스 소개
        </p>
        <p
          className={`${styles.text} ${location.includes('/writing') && styles.selected_text}`}
          onClick={() => navigate('/writing')}>
          유언장 작성하기
        </p>
        <p
          className={`${styles.text} ${location.includes('/search') && styles.selected_text}`}
          onClick={() => navigate('/searching')}>
          유언장 찾기
        </p>
        <p
          className={`${styles.text} ${location.includes('/lawyer') && styles.selected_text}`}
          onClick={() => navigate('/lawyerMain')}>
          변호사 알아보기
        </p>
        <p
          className={`${styles.text} ${location.includes('/faq') && styles.selected_text}`}
          onClick={() => navigate('/faq')}>
          법률 문의 게시판
        </p>
        {loginState && (
          <p
            className={`${styles.text} ${location === '/mypage' && styles.selected_text}`}
            onClick={() => navigate('/mypage')}>
            나의 유언장
          </p>
        )}
        {loginState ? (
          <button className={styles.button} onClick={handleLogout}>
            <p className={styles.login_text}>로그아웃</p>
          </button>
        ) : (
          <button className={styles.button} onClick={() => navigate('/login')}>
            <p className={styles.login_text}>로그인/회원가입</p>
          </button>
        )}
      </div>
    </header>
  );
};
