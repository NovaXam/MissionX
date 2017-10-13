import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import './Rover1.css';
import rover2 from '../assets/rover2.jpg';
import rover1 from '../assets/rover1.png';
import rover3 from '../assets/rover3.jpg';

const Rover1 = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log('before change', currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log('after change', currentSlide);
    },
  };
  return (
    <div className="mainRoverCuriosity">
      <div className="nestedRover">
        <div className="curiosity">
          <div className="headerStripe"><h3>CURIOSITY</h3></div>
          <img src={rover2} alt="roverpicture" />
          <ul>
            <li>Length: 10 feet </li>
            <li>Width: 9 feet </li>
            <li>Height: 7 feet </li>
            <li>Mass: 1,982 lb </li>
          </ul>
          <p><b>MISSION:</b> to see if Mars ever could have
                supported small life forms called microbes...and
                if humans could survive there someday!
          </p>
        </div>
        <Link to="/rovers/spirit" onClick={props.handleSpiListen}><img id="rov" src={rover1} alt="roverpicture" /></Link>
        <Link to="/rovers/opportunity" onClick={props.handleOppListen}><img id="rov" src={rover3} alt="roverpicture" /></Link>
      </div>
      <div className="gallaryAPI">
       <Slider {...settings}>
          {props.pictures.map((elem) => {
            return (
              <form className="bodyCurPic" photo_id={elem.id} onSubmit={props.handleSaveListener}>
                <img src={elem.img_src} key={elem.id} alt="roverpicture" />
                <input type="submit" value="&#8711;" />
              </form>
            );
          })
          }
        </Slider>
      </div>
    </div>
  );
};

export default Rover1;
