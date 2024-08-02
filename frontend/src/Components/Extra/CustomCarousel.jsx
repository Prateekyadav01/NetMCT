import { useState, useEffect, useRef } from "react";
import MovieCard from "../Sliders/MovieCard";
import PropTypes from 'prop-types';

const CustomCarousel = ({
  items,
  slidesToShow = 3,
  slidesToScroll = 1,
  autoplay = false,
  autoplaySpeed = 3000,
  endPoint
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselTrackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [translation, setTranslation] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setTranslation(0); // Reset translation on window resize
      setCurrentIndex(0); // Reset to first slide
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.transition = 'transform 0.5s ease-out';
      carouselTrackRef.current.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;
    }
  }, [currentIndex, slidesToShow]);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setIsDragging(true);
    setStartPos(touchDown);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touchDown = startPos;
    const currentPos = e.touches[0].clientX;
    const diff = currentPos - touchDown;
    if (diff > 5) {
      goToPrevious();
    } else if (diff < -5) {
      goToNext();
    }
    setIsDragging(false);
  };

  const goToSlide = (index) => {
    if (index < 0) {
      index = 0;
    } else if (index > items.length - slidesToShow) {
      index = items.length - slidesToShow;
    }
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - slidesToScroll);
    }
  };

  const goToNext = () => {
    if (currentIndex < items.length - slidesToShow) {
      goToSlide(currentIndex + slidesToScroll);
    }
  };

  return (
    <div className="carousel-container overflow-hidden relative">
      <button onClick={goToPrevious} className="absolute left-0 z-10">Prev</button>
      <div
        className="carousel-track flex"
        ref={carouselTrackRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {items.map((item, index) => (
          <MovieCard key={item.id} ele={item} endPoint={endPoint || "movie"} />
        ))}
      </div>
      <button onClick={goToNext} className="absolute right-0 z-10">Next</button>
    </div>
  );
};

CustomCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  endPoint: PropTypes.string,
};

export default CustomCarousel;