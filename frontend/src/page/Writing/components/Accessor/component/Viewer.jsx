import React from 'react';
import './Viewer.css';
import { WillState } from 'stores/will-store';
import { useRecoilState } from 'recoil';

export const ViewerGroup = () => {
  const [willState, setWillState] = useRecoilState(WillState);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;

    // beneficiary의 해당 인덱스에 해당하는 값 변경
    setWillState(prevWillState => ({
      ...prevWillState,
      beneficiaries: prevWillState.beneficiaries.map((beneficiary, i) => {
        if (i === index) {
          return {
            ...beneficiary,
            [name]: value,
          };
        }
        return beneficiary;
      }),
    }));
  };

  const handleAddInput = () => {
    // beneficiaries에 새 항목 추가
    setWillState(prevWillState => ({
      ...prevWillState,
      beneficiaries: [...prevWillState.beneficiaries, { name: '', email: '', relation: '' }],
    }));
  };

  const handleRemoveInput = index => {
    // beneficiaries에서 해당 인덱스의 항목 제거
    setWillState(prevWillState => ({
      ...prevWillState,
      beneficiaries: prevWillState.beneficiaries.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="formContainer">
      {willState.beneficiaries.map((beneficiary, index) => (
        <div className="inputGroup" key={index}>
          <div className="LastContainer">
            <div className="topGroup">
              <div className="inputField">
                <label>이름</label>
                <input
                  type="text"
                  name="name"
                  placeholder="이름을 입력하세요"
                  value={beneficiary.name}
                  onChange={e => handleInputChange(index, e)}
                />
              </div>
              <div className="inputField">
                <label>이메일</label>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                  value={beneficiary.email}
                  onChange={e => handleInputChange(index, e)}
                />
              </div>
            </div>
            <div className="bottomGroup">
              <div className="relationField">
                <label>관계</label>
                <input
                  type="text"
                  name="relation"
                  placeholder="작성자와의 관계를 입력하세요"
                  value={beneficiary.relation}
                  onChange={e => handleInputChange(index, e)}
                />
              </div>
            </div>
          </div>
          <div className="BehindContainer">
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveInput(index)} className="removeButton">
                <p className="Axe">x </p>
                삭제
              </button>
            )}
          </div>
        </div>
      ))}
      <p className="explain">열람인으로 추가하면 유언장 개봉 날짜에 자동으로 이메일이 전송됩니다</p>
      <button type="button" onClick={handleAddInput} className="addButton">
        추가하기
      </button>
    </div>
  );
};
