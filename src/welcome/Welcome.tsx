import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Loading from '@/components/Basic/Loading';
import Progress from '@/self-intro/components/Progress';
import './Welcome.scss';

const Welcome = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/self');
    }, 8000);
  }, [])

  return (
    <div className="welcome">
      <Loading></Loading>
      <Progress></Progress>
    </div>
  )
};

export default Welcome;