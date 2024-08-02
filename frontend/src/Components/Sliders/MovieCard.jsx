import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import poster from "../../assets/images/poster.png";
import { useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import { IoIosPlay } from "react-icons/io";

// Component
const MovieCard = ({ ele, endPoint }) => {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const genres = useSelector((state) => state.home.genre);
  const vote =
    ele.vote_average.toString().length > 3
      ? ele.vote_average.toString().slice(0, 3)
      : ele.vote_average;
  const ratingColor = vote >= 7 ? "#008101" : "#FFA401";
  const mediaName =
    ele.original_title || ele.original_name || ele.title || ele.name;
  const displayText =
    mediaName.length > 19 ? `${mediaName.slice(0, 19)}...` : mediaName;
  const posterImg = ele.poster_path ? baseUrl + ele.poster_path : poster;

  const getGenre = useCallback(
    (id) => {
      return genres.find((g) => g.id === id);
    },
    [genres]
  );

  const genreList = useMemo(() => {
    return ele.genre_ids.map((id) => getGenre(id)).filter((g) => g);
  }, [ele.genre_ids, getGenre]);

  return (
    <Link
      to={`/home/details/${ele.media_type || endPoint}/${ele.id}`}
      className="w-[300px] h-[200px] cardLink flex items-center justify-center transition-all duration-100 ease-in-out"
    >
      <div className="carouselItem cursor-pointer flex flex-col gap-0">
        <div className="posterBloc w-full rounded-2xl h-full relative">
          <div className="w-full min-w-[300px] h-full rounded-[1rem]">
            <LazyLoadImage
              className="w-[300px] min-h-[200px] h-full rounded-[0.2rem] object-fill"
              src={posterImg}
              effect="blur"
              alt=""
            />
          </div>
        </div>
        <div className="p-4 w-full h-full flex flex-col gap-4 text-white detailsBox bg-black transition-all duration-100 ease-in-out">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[50%] border-[1px] border-white flex items-center justify-center">
                <IoIosPlay />
              </div>
              <div className="w-6 h-6 rounded-[50%] border-[1px] border-white flex items-center justify-center">
                <IoIosPlay />
              </div>
              <div className="w-6 h-6 rounded-[50%] border-[1px] border-white flex items-center justify-center">
                <IoIosPlay />
              </div>
              <div className="w-6 h-6 rounded-[50%] border-[1px] border-white flex items-center justify-center">
                <IoIosPlay />
              </div>
            </div>
            <div className="w-6 h-6 rounded-[50%] border-[1px] border-white flex items-center justify-center">
              <IoIosPlay />
            </div>
          </div>
          <div>
            <p style={{ color: ratingColor }}>{vote}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap gap-y-2">
            {genreList.map((genre) => {
              return <p key={genre.id}>{genre.name}</p>;
            })}
          </div>
        </div>
        {/* <div className="textBlock mt-2 flex flex-col gap-1 text-ellipsis whitespace-nowrap overflow-hidden">
          <span className="mediaTitle text-lg ">{displayText}</span>
          <span className="date text-xs font-semibold text-gray-400">
            {ele.release_date || ele.first_air_date}
          </span>
        </div> */}
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  ele: PropTypes.object.isRequired,
  endPoint: PropTypes.string.isRequired,
};

export default MovieCard;
