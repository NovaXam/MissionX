import React from 'react';
import './Mission.css';
import { Link } from 'react-router-dom';

const Mission = (props) => {
  return (
    <div>
      <div className="textfield">
        <p>NASA's Mars Exploration Program <span>is a long-term effort of
           robotic exploration of the red planet and includes 3 rovers.
           Rovers were designed to assess whether Mars ever had an environment
           able to support life forms. In other words, their mission is to
           determine the planet's "habitability."</span></p>
        <Link to='/rovers'><p className="lastTexPart">...here what they found out</p></Link>
      </div>
    </div>
  );
};

export default Mission;

