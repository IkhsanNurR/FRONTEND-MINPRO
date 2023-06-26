import { doRequestGetPhoto } from "@/redux/jobhireSchema/jobHireSchema/action/actionReducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Slider from "react-slick";

const ImgSlide = () => {
  const { job_photo, refresh } = useSelector(
    (state: any) => state.JobPhotoReducers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doRequestGetPhoto());
  }, [refresh]);

  const settings = {
    arrows: false,
    autoplay: true,
    autoplayspeed: 500,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {(job_photo || []).map((photo: any) => (
          <div className="p-2">
            <div className="drop-shadow bg-white h-28 rounded-md flex items-center justify-center">
              <img
                src={`http://localhost:3001/public/jobhire/${photo.jopho_filename}`}
                className="object-contain h-28 w-auto"
                alt="profile picture"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImgSlide;
