import React from 'react';
import './Timer.css';
// import ReactMomentCountDown from 'react-moment-countdown';

const Timer = (props) => {
  return (
    <div className="timer">
      {props.currentTime}
    </div>
  );
};

export default Timer;
