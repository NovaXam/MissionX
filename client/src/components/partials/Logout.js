import React from 'react';
import './Logout.css';

const Logout = (props) => {
  return (
    <div className='logout'>
      <button style={{visibility: props.visible }}>
        <p>LOGOUT</p>
      </button>
    </div>
    )
}

export default Logout;
