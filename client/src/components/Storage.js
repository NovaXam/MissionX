import React from 'react';
import Slider from 'react-slick';
import './Storage.css';

const Storage = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
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
      <div className="albume">
        <Slider {...settings}>
          {props.albume.map((elem) => {
            return (
              <form className="StoragePic" photo_id={elem.photo_id} user_id={elem.user_id} onSubmit={props.handleDeleteListener}>
                <div className="infoBlock">
                  <ul>
                    <li>date of picture: {elem.earth_date}  landing date: {elem.landing_date}</li>
                    <li>rover name: {elem.rover_name} status: {elem.status}</li>
                  </ul>
                </div>
                <img src={elem.url} key={elem.id} alt="roverpicture" />
                <input type="submit" value="&#8486;" />
              </form>
            );
          })
          }
        </Slider>

      </div>
    );
}

export default Storage;
