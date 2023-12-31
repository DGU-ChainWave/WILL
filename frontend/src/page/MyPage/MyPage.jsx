import { useRecoilValue } from 'recoil';
import { UserState } from '../../stores/login-store';
import React, { useState, useEffect, useMemo } from 'react';
import Web3 from 'web3';
import instance from 'api/axios';
import styles from './MyPage.module.scss';

export const MyPage = () => {
  const user = useRecoilValue(UserState);

  const [params, setParams] = useState({});

  // Ethereum 네트워크 연결
  const web3 = new Web3('http://127.0.0.1:8545'); // Ethereum 네트워크 RPC URL로 대체

  const token = useMemo(() => localStorage.getItem('token'), []);

  const getTransactionHash = async () => {
    const res = await instance.get(`/api/mypage/txHash`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const txHash = res.data.txHash;
    console.log('유저 정보로 부터의 txHash: ', txHash);
    return txHash;
  };

  const getTransaction = async () => {
    try {
      const txHash = await getTransactionHash();
      const tx = await web3.eth.getTransaction(txHash);
      if (tx) {
        let tx_data = tx.input;
        let input_data = '0x' + tx_data.slice(10); // get only data without function selector

        let params = web3.eth.abi.decodeParameters(
          ['string', 'string', 'string', 'string', 'string', 'string'],
          input_data,
        );
        console.log(params);
        setParams(params);
      } else {
        console.log('트랜잭션을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('트랜잭션 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div className={styles.will_textarea}>
      <div className={styles.will_title}>{user?.username}님의 유언장</div>
      {params[0] ? (
        <>
          <div>
            저는 {params[1]}입니다. 오늘은 {params[4]}입니다. 나의 취지는 이 세상을 떠남으로써 내 사랑과 감사를
            표현하고, 내 가족과 사랑하는 모든 사람들에게 힘과 위로를 전하는 것입니다.
          </div>
          <br />
          <div>{params[2]}</div>
          <a href={`https://ipfs.io/ipfs/${params[3]}`} target="_blank" rel="noopener noreferrer">
            녹음 URL 바로가기
          </a>
        </>
      ) : (
        <div>유언장을 찾을 수 없습니다.</div>
      )}
    </div>
  );
};
