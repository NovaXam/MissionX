import React from 'react';
import './Rovers.css';
import { Link } from 'react-router-dom';
import rover2 from '../assets/rover1.png';
import rover1 from '../assets/rover2.jpg';
import rover3 from '../assets/rover3.jpg';

const Rovers = (props) => {
  return (
    <div className="mainRover">
      <Link to="/rovers/curiosity" onClick={props.handleCurListen}>
        <div className="rover">
          <div className="headerStripe"><h3>CURIOSITY</h3></div>
          <img src={rover1} alt="roverpicture" />
          <ul>
            <li>Length: 10 feet </li>
            <li>Width: 9 feet </li>
            <li>Height: 7 feet </li>
            <li>Mass: 1,982 lb </li>
          </ul>
          <p> <b>MISSION:</b> to see if Mars ever could have
              supported small life forms called microbes...and
              if humans could survive there someday!
          </p>
        </div>
      </Link>
      <Link to="/rovers/spirit" onClick={props.handleSpiListen}>
        <div className="rover">
          <div className="headerStripe"><h3>SPIRIT</h3></div>
          <img src={rover2} alt="roverpicture" />
          <ul>
            <li>Length: 12 feet </li>
            <li>Width: 7 feet </li>
            <li>Height: 8 feet </li>
            <li>Mass: 1,796 lb </li>
          </ul>
          <p><b>MISSION:</b> was targeted to a site that appears to
              have been affected by liquid water in the past, the
              crater Gusev, a possible former lake in a giant.
          </p>
        </div>
      </Link>
      <Link to="/rovers/opportunity" onClick={props.handleOppListen}>
        <div className="rover">
          <div className="headerStripe"><h3>OPPORTUNITY</h3></div>
          <img src={rover3} alt="roverpicture" />
          <ul>
            <li>Length: 10 feet </li>
            <li>Width: 9 feet </li>
            <li>Height: 12 feet </li>
            <li>Mass: 2,167 lb </li>
          </ul>
          <p><b>MISSION:</b> Opportunity has successfully investigated soil
              and rock samples and taken panoramic photos of its
              landing site.
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Rovers;
