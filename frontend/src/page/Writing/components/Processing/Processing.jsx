import React, { useEffect, useMemo, useState } from 'react';
import styles from './Processing.module.css';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Will from 'truffle_abis/Will.json';
import { useRecoilState, useRecoilValue } from 'recoil';
import { WillState } from 'stores/will-store';
import { UserState } from 'stores/login-store';
import instance from 'api/axios';
import CryptoJS from 'crypto-js';
// const ganache = require('ganache');

// 현재 시각을 서울을 기준으로 설정
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const hour = today.getHours();
const minute = today.getMinutes();
const second = today.getSeconds();
const nowDate = `${year}-${month}-${date} ${hour}:${minute}:${second}`;

export const Processing = () => {
  const navigate = useNavigate();

  const [transactionStatus, setTransactionStatus] = useState(null);
  // const [web3, setWeb3] = useState(null);
  const [willState, setWillState] = useRecoilState(WillState);
  const userState = useRecoilValue(UserState);
  // const [ipfs, setIpfs] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const token = useMemo(() => localStorage.getItem('token'), []);

  const uploadToPinata = async () => {
    if (!willState.audio) {
      alert('No audio data available to upload to IPFS.');
      return;
    }

    const { data } = await instance.post(
      '/api/ipfs/upload',
      {
        audio: willState.audio,
        nowDate: nowDate,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    setIpfsHash(data.ipfsHash);
    setWillState(prevState => ({
      ...prevState,
      ipfsHash: data.ipfsHash,
    }));
  };

  const handleSaveToBlockchain = async () => {
    try {
      // Ethereum 네트워크 연결
      const web3 = new Web3('http://127.0.0.1:8545'); // Ethereum 네트워크 RPC URL로 대체

      // 스마트 컨트랙트 ABI 및 주소 가져오기
      const contractAbi = Will.abi;
      const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // 스마트 컨트랙트 주소로 대체

      // 스마트 컨트랙트 인스턴스 생성
      const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

      // Recoil로부터 데이터 가져오기 (예: willState.openDate)
      const email = userState.email;
      const username = userState.username;
      const will = willState.will;
      const audioHash = willState.ipfsHash;

      const combinedData = `${userState.email}${userState.username}${willState.will}${ipfsHash}${nowDate}`;
      const sha256Hash = CryptoJS.SHA256(combinedData).toString();

      console.log(sha256Hash);

      // accounts 가져오기
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      console.log('계정 : ', accounts);

      // 트랜잭션 데이터 및 설정
      const fromAddress = accounts[0]; // 운영자 지갑 주소
      const gasPrice = web3.utils.toWei('20', 'gwei');

      // 스마트 컨트랙트 함수 호출
      const result = await contractInstance.methods
        .setWill(email, username, will, audioHash, nowDate, sha256Hash)
        .send({
          from: fromAddress,
          value: 0,
          gas: 2000000,
          gasPrice: gasPrice,
          to: contractAddress,
        });

      // 트랜잭션 성공 시 처리
      console.log('트랜잭션 성공:', result);
      setTransactionStatus(result.transactionHash);
    } catch (error) {
      // 트랜잭션 에러 처리
      console.error('트랜잭션 에러:', error);
    }
  };

  const postTxHash = async () => {
    try {
      const response = await instance.put(
        `/api/mypage/updateTxHash`,
        {
          txHash: transactionStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTransactionStatus(null);
    uploadToPinata();
  }, []);

  useEffect(() => {
    if (ipfsHash) {
      console.log('ipfsHash:', ipfsHash);
      handleSaveToBlockchain();
    }
  }, [ipfsHash]);

  useEffect(() => {
    if (transactionStatus !== null) {
      console.log('transactionStatus:', transactionStatus);
      postTxHash();
      navigate('/writing9');
    }
  }, [transactionStatus]);

  return (
    <div className={styles.container}>
      <p className={styles.textBig} style={{ marginTop: '150px' }}>
        블록체인 유언장을 생성 중입니다...
      </p>
      <p className={styles.text} style={{ marginTop: '0px' }}>
        저장된 유언장은 블록체인 기술
        <span className={styles.text} style={{ fontWeight: '500' }}></span>
        을 통해 <br />
        타인에 의해 훼손되지 않고 안전하게 보관됩니다.
      </p>
      <img width="252px" height="170px" marginTop="27px" src="CreatWill.svg" />
    </div>
  );
};
