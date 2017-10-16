import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import Loading from './partials/Loading';
import './Rover3.css';
import rover2 from '../assets/rover2.png';
import rover1 from '../assets/rover1.png';
import rover3 from '../assets/rover3.png';

const Rover3 = (props) => {
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


  const rovOppStyle = {
    width: '115px',
    height: '115px',
    margin: '15px 5px -5px',
  };

  const rovSpiStyle = {
    width: '100px',
    height: '100px',
    margin: '15px 15px 0px',
  };

  const rovCurStyle = {
    width: '100px',
    height: '100px',
    margin: '15px 15px 0px',
  };

  return (
    <div className="mainRoverOpportunity">
      <div className="CalenAndIcon">
        <div className="cal">
          <Calendar onChange={props.handleOppDateListen}/>
        </div>
        <div className="nestedRover">
          <Link to="/rovers/curiosity" onClick={props.handleRoverListener}><img id="rovCur" src={rover2} style={rovCurStyle} alt="roverpicture" /></Link>
          <Link to="/rovers/spirit" onClick={props.handleRoverListener}><img id="rovSpi" src={rover1} style={rovSpiStyle} alt="roverpicture" /></Link>
          <Link to="/rovers/opportunity" onClick={props.handleRoverListener}><img id="rovOpp" src={rover3} style={rovOppStyle} alt="roverpicture" /></Link>
        </div>
      </div>
      <div className="loading">
        <Loading bubbles={props.bubbles} />
      </div>
      <div className="gallaryAPI">
        <Slider {...settings}>
          {props.pictures.map((elem) => {
            return (
              <form className="bodyCurPic" photo_id={elem.id} onSubmit={props.handleSaveListener}>
                <div>{elem.earth_date}</div>
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

export default Rover3;
