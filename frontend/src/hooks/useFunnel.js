import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useFunnel = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Intro, Federal, Healthcare, Inheritance, Will, Recording, Accessor, Processing, Completed
  const [step, setInternalStep] = useState('Intro');

  // Update URL when step changes
  const setStep = newStep => {
    setSearchParams({ step: newStep });
    setInternalStep(newStep);
  };

  const Step = props => {
    return <>{props.children}</>;
  };

  // Funnel 컴포넌트는 children으로 받은 Step 컴포넌트들 중 현재 step에 해당하는 컴포넌트를 반환한다.
  const Funnel = ({ children }) => {
    const targetStep = React.Children.toArray(children).find(childStep => childStep.props.name === step);

    return targetStep || null;
  };

  Funnel.Step = Step;

  useEffect(() => {
    const stepFromUrl = searchParams.get('step');
    if (stepFromUrl && stepFromUrl !== step) {
      setInternalStep(stepFromUrl);
    }
  }, [searchParams]);

  // Initialize URL if no step param exists
  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: 'Intro' }, { replace: true });
    }
  }, []);

  return [Funnel, setStep];
};
