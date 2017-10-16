import React from 'react';
import ReactLoading from 'react-loading';

const Loading = (props) => {
  return (
    <div>
      <ReactLoading type={props.bubbles} color="#444" />
    </div>
  );
};

export default Loading;
