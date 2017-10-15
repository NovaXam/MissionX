import React from 'react';
import Timer from './Timer';
import './Footer.css';
import Spacex_logo from '../../assets/Spacex_logo.png';

const Footer = (props) => {
  return (
    <div className="mainFooter">
      <img id="background" src="https://pi.tedcdn.com/r/pf.tedcdn.com/images/playlists/big_deal_mars_2451387841_1200x627.jpg?c=1050%2C550&w=1050" alt="picture" />
      <div className="timerBlock">
        <Timer currentTime={props.timeOver} />
        <a href="http://www.spacex.com/" targer="_blank"> <img id="spaceXlogo" src={ Spacex_logo } alt="imagepicture" /></a>
      </div>
    </div>
  );
};

export default Footer;
