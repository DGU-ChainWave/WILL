import React from 'react';
import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Navigate, Route, Routes, redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  Home,
  Intro,
  Searching,
  SearchResultFail,
  SearchResultSuccess,
  SearchComplete,
  WritingPage,
  Faq,
  Login,
  Join,
  MyPage,
  LawyerMain,
  LawyerProfile,
} from './page';
import { LoginState } from 'stores/login-store';
import { Layout } from './Routes/Layout';

const App = () => {
  const isLogin = useRecoilValue(LoginState);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/searching" element={<Searching />} />
          <Route path="/searchResultFail" element={<SearchResultFail />} />
          <Route path="/searchResultSuccess" element={<SearchResultSuccess />} />
          <Route path="/searchComplete" element={<SearchComplete />} />
          <Route path="/writing" element={isLogin ? <WritingPage /> : <Navigate to="/login" />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={isLogin ? <Navigate to="/mypage" /> : <Login />} />
          <Route path="/join" element={isLogin ? <Navigate to="/mypage" /> : <Join />} />
          <Route path="/mypage" element={isLogin ? <MyPage /> : <Navigate to="/login" />} />
          <Route path="/lawyerMain" element={<LawyerMain />} />
          <Route path="/lawyerProfile" element={<LawyerProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
