import React, { useState, useEffect } from 'react';
import { useFunnel } from 'hooks/useFunnel';
import { Accessor, Completed, Federal, Healthcare, Inheritance, Intro, Processing, Recording, Will } from './components';

export const WritingPage = () => {
  const [willData, setWillData] = useState({
    funeral: {
      selected: '',
      note: '',
    },
    grave: {
      selected: '',
      note: '',
    },
    lifeSupport: {
      selected: '',
    },
    organDonation: {
      selected: '',
    },
    inheritance: {
      selected: '',
      note: '',
    },
    plus: '',
    will: '',
    audio: '',
    ipfsHash: '',
    beneficiaries: [{ name: '', email: '', relation: '' }],
    openDate: new Date(),
  });
  const [Funnel, setStep] = useFunnel();

  const handleWillData = (prop, key, value) => {
    if (key !== undefined) {
      setWillData(prevWillData => ({
        ...prevWillData,
        [prop]: {
          ...prevWillData[prop],
          [key]: value,
        },
      }));
    } else {
      setWillData(prevWillData => ({
        ...prevWillData,
        [prop]: value,
      }));
    }
  };

  const isEditing = !((new URLSearchParams()).get('step') === 'Completed');

  useEffect(() => {
    const handleBeforeUnload = e => {
      if (!isEditing) return;

      e.preventDefault();
      e.returnValue = '작성 중인 내용이 있습니다. 페이지를 나가면 작성 중인 내용이 모두 사라집니다.';
    };

    const handlePopState = e => {
      if (!isEditing) return;

      if (window.confirm('작성 중인 내용이 있습니다. 정말 페이지를 나가시겠습니까?')) {
        return;
      }

      e.preventDefault();
      window.history.pushState(null, '', window.location.href);
    };

    // 브라우저 닫기/새로고침 시
    window.addEventListener('beforeunload', handleBeforeUnload);
    // 뒤로가기 시
    window.addEventListener('popstate', handlePopState);

    // 메모리 누수 방지
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isEditing]);

  return (
    <Funnel>
      <Funnel.Step name="Intro">
        <Intro
          onNext={() => {
            setStep('Federal');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="Federal">
        <Federal
          willData={willData}
          onQClick={(prop, key, value) => {
            handleWillData(prop, key, value);
          }}
          onNext={() => {
            setStep('Healthcare');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="Healthcare">
        <Healthcare
          willData={willData}
          onQClick={(prop, key, value) => {
            handleWillData(prop, key, value);
          }}
          onNext={() => {
            setStep('Inheritance');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="Inheritance">
        <Inheritance
          willData={willData}
          onQClick={(prop, key, value) => {
            handleWillData(prop, key, value);
          }}
          onNext={() => {
            setStep('Will');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="Will">
        <Will
          willData={willData}
          onQClick={(prop, key, value) => {
            handleWillData(prop, key, value);
          }}
          onNext={() => {
            setStep('Recording');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="Recording">
        <Recording
          willData={willData}
          onQClick={(prop, key, value) => {
            handleWillData(prop, key, value);
          }}
          onNext={() => {
            setStep('Accessor');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="Accessor">
        <Accessor
          willData={willData}
          onQClick={(prop, key, value) => {
            handleWillData(prop, key, value);
          }}
          onNext={() => {
            setStep('Processing');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="Processing">
        <Processing
          willData={willData}
          onQClick={(prop, key, value) => {
            handleWillData(prop, key, value);
          }}
          onNext={() => {
            setStep('Completed');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="Completed">
        <Completed />
      </Funnel.Step>
    </Funnel>
  );
};
