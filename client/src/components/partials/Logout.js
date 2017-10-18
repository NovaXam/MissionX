import React from 'react';
import './Logout.css';

const Logout = (props) => {
  const buttonStyle = {
    visibility: props.visibility,
  };
  console.log(`${props.visibility} <------- this is checker`);
  return (
    <div className='logout' style={buttonStyle} >
      <button>LOGOUT</button>
    </div>
  )
}

export default Logout;
