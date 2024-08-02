import PropTypes from 'prop-types';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import poster from "../../assets/images/poster.png";
import { useSelector } from "react-redux";
import { useMemo, useCallback } from 'react';

// Component
const SearchCard = ({ ele, endPoint }) => {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const genres = useSelector((state) => state.home.genre);
  const vote = ele.vote_average.toString().length > 3 ? ele.vote_average.toString().slice(0, 3) : ele.vote_average;
  const ratingColor = vote >= 7 ? "#008101" : "#FFA401";
  const mediaName = ele.original_title || ele.original_name || ele.title || ele.name;
  const displayText = mediaName.length > 19 ? `${mediaName.slice(0, 19)}...` : mediaName;
  const posterImg = ele.poster_path ? baseUrl + ele.poster_path : poster;

  const getGenre = useCallback((id) => {
    return genres.find((g) => g.id === id);
  }, [genres]);

  const genreList = useMemo(() => {
    return ele.genre_ids.map((id) => getGenre(id)).filter((g) => g);
  }, [ele.genre_ids, getGenre]);

  return (
    <Link to={`/home/details/${ele.media_type || endPoint}/${ele.id}`} className='w-[23%]'>
      <div className="carouselItem cursor-pointer">
        <div className="posterBloc w-full rounded-2xl h-full relative">
          <span className="w-full rounded-[1rem]">
            <LazyLoadImage
              className="w-full rounded-[1rem]"
              src={posterImg}
              effect="blur"
              alt=""
            />
          </span>
          <div className="circleRating w-12 absolute bottom-[-1.5rem] left-2">
            <CircularProgressbar
              value={vote}
              maxValue={10}
              text={vote.toString().slice(0, 3)}
              background
              backgroundPadding={4}
              styles={buildStyles({
                backgroundColor: "#fff",
                textColor: "#000",
                pathColor: ratingColor,
                trailColor: "transparent",
                textSize: "1.8rem",
              })}
            />
          </div>
          <div className="genres flex items-center justify-end flex-wrap gap-1 w-1/2 absolute bottom-4 right-2">
            {genreList.map((g) => (
              <p
                className="bg-primaryRed px-2 py-1 rounded-lg text-xs"
                key={g.id}
              >
                {g.name}
              </p>
            ))}
          </div>
        </div>
        <br />
        <div className="textBlock mt-2 flex flex-col gap-1 text-ellipsis whitespace-nowrap overflow-hidden">
          <span className="mediaTitle text-lg ">{displayText}</span>
          <span className="date text-xs font-semibold text-gray-400">
            {ele.release_date || ele.first_air_date}
          </span>
        </div>
      </div>
    </Link>
  );
};

SearchCard.propTypes = {
  ele: PropTypes.object.isRequired,
  endPoint: PropTypes.string.isRequired,
};

export default SearchCard;