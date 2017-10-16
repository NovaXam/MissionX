import React from 'react';
import Timer from './Timer';
import './Footer.css';
import Spacex_logo from '../../assets/Spacex_logo.png';
import MarsPhoto from '../../assets/big_deal_mars.jpg';

//compoment to show background image and countdown timer
const Footer = (props) => {
  return (
    <div className="mainFooter">
      <img id="background" src={MarsPhoto} alt="picture" />
      <div className="timerBlock">
        <Timer currentTime={props.timeOver} />
        <a href="http://www.spacex.com/" target="_blank"> <img id="spaceXlogo" src={ Spacex_logo } alt="imagepicture" /></a>
      </div>
    </div>
  );
};

export default Footer;
