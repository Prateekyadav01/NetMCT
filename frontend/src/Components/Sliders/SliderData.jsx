import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import MovieCard from "./MovieCard";
import { Carousel } from 'nuka-carousel';

const SliderData = ({ name, data, endPoint }) => {
  const settings = {
    infinite: false,
    speed: 500,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div
      className={`sliderSection slider-container w-[100%] flex flex-col gap-4 py-8 pl-20 ${
        name === "Trending Now Movies" ? "mt-[-15rem] z-[15] text-white" : ""
      }`}
    >
      <div className="title flex items-center justify-between">
        <p className="text-2xl font-medium text-white">{name}</p>
      </div>
      <Carousel 
      slidesToScroll={"slide"}
      showArrows
      className="nukaWala w-[100%] rounded-2xl overflow-y-hidden" >
        {data &&
          data.map((ele) => {
            return (
              <MovieCard
                ele={ele}
                endPoint={endPoint || "movie"}
                key={ele.id}
              />
            );
          })}
      </Carousel>
    </div>
  );
};

// Define PropTypes
SliderData.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array,
  endPoint: PropTypes.string,
  // ... other props
};

export default SliderData;
