import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setCurrentMedia,
  setDetails,
  setIsModalOpen,
  setPlayerVideo,
} from "../../Redux/detailsSlice";
import { setUser } from "../../Redux/authSlice";
import { fetchData } from "../../utils/movieApi";
import poster from "../../assets/images/poster.png";
import imdb from "../../assets/images/imdb.png";
import langArray from "../../assets/languages.json";
import { IoIosPlay } from "react-icons/io";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import profile from "../../assets/images/profile.png";
import { addToFavourites, removeFromFavourites } from "../../utils/userApi";
import { current } from "@reduxjs/toolkit";

const MovieDetails = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const {
    currentMedia,
    vote,
    posterImg,
    backdropImg,
    mediaName,
    crew,
    languages,
    videos,
  } = useSelector((state) => state.media);
  const { user } = useSelector((state) => state.auth);
  const baseUrl = "https://image.tmdb.org/t/p/original";
  // const newVideo = video.map(())

  useEffect(() => {
    const commonApiParams = {
      language: "en-US",
    };
    const url = `/${param.mediaType}/${param.id}`;
    const getDetails = async () => {
      try {
        const data = await fetchData(url, commonApiParams);
        dispatch(setCurrentMedia(data));
        const vote =
          data.vote_average.toString().length > 3
            ? data.vote_average.toString().slice(0, 3)
            : data.vote_average;

        const ratingColor = vote >= 7 ? "#008101" : "#FFA401";

        const mediaName =
          data.original_title || data.original_name || data.title || data.name;

        //  displayText =
        //     mediaName.length > 19 ? `${mediaName.slice(0, 19)}...` : mediaName;

        const posterImg = data.poster_path
          ? baseUrl + data.poster_path
          : poster;

        const backdropImg = data.backdrop_path
          ? baseUrl + data.backdrop_path
          : "";

        const date = data.release_date || data.first_air_date || "";
        const languages = !data.original_language
          ? langArray.filter((lang) => data.languages?.includes(lang.iso_639_1))
          : langArray.map((lang) => {
              return lang.iso_639_1 == data.original_language;
            });

        dispatch(
          setDetails({
            vote: vote,
            name: mediaName,
            color: ratingColor,
            image: posterImg,
            backdropImg: backdropImg,
            date: date,
            languages,
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    getDetails();
  }, [param.id, dispatch, param.mediaType]);

  return (
    currentMedia !== undefined &&
    currentMedia !== null &&
    Object.keys(currentMedia).length !== 0 && (
      <div
        className="w-full h-full pb-8 flex flex-col pt-20 bg-top bg-no-repeat bg-cover"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(0, 0, 0, 0.9), rgb(0, 0, 0, 0.6), rgb(0, 0, 0, 0.9)), url(${backdropImg})`,
        }}
      >
        <div className="flex w-full h-full min-h-[100vh] justify-between relative">
          <div className="w-[50%] h-full p-8 flex flex-col gap-12">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8">
                <img
                  className="w-full h-full object-contain"
                  src={imdb}
                  alt=""
                />
              </div>
              <div className="flex items-center gap-4">
                <p>{vote}/10</p>
                {languages.map((lang) => {
                  return <p key={lang.iso_639_1}>{lang.english_name}</p>;
                })}
              </div>
            </div>
            <div className="genres flex items-center flex-wrap gap-1">
              {currentMedia.genres.map((genre) => {
                return (
                  <p
                    className="bg-primaryRed px-2 py-1 rounded-md text-xs"
                    key={genre.id}
                  >
                    {genre.name}
                  </p>
                );
              })}
            </div>
            <div className="flex flex-col">
              <h1 className="text-[5rem] font-bold text-white flex items-center mediaName">
                {mediaName}. 
              </h1>
              <p className="text-lg font-semibold text-gray-500">
                {currentMedia.tagline}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[1rem] font-semibold">
                {currentMedia.overview}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="bg-primaryRed rounded-3xl flex items-center py-2 px-6 gap-3"
                onClick={() => {
                  dispatch(
                    setPlayerVideo(
                      `https://www.youtube.com/watch?v=${videos[0].key}`
                    )
                  );
                  dispatch(setIsModalOpen(true));
                }}
              >
                <div className="w-8 h-8 rounded-[50%] flex items-center justify-center bg-white">
                  <IoIosPlay className="text-primaryRed text-lg" />
                </div>
                <p>WATCH NOW</p>
              </button>
              {Object.keys(user).length !== 0 &&
              user.likes.includes(currentMedia.id.toString()) ? (
                <button
                  className="bg-primaryRed rounded-3xl flex items-center py-2 px-6 gap-3"
                  onClick={async () => {
                    const newData = await removeFromFavourites(currentMedia.id);
                    if (newData) {
                      dispatch(setUser(newData));
                    }
                  }}
                >
                  <div className="w-8 h-8 rounded-[50%] flex items-center justify-center bg-white">
                    <AiFillDislike className="text-primaryRed text-lg" />
                  </div>
                  <p>Dislike</p>
                </button>
              ) : (
                <button
                  className="bg-primaryRed rounded-3xl flex items-center py-2 px-6 gap-3"
                  onClick={async () => {
                    const newData = await addToFavourites(currentMedia.id);
                    if (newData) {
                      dispatch(setUser(newData));
                    }
                  }}
                >
                  <div className="w-8 h-8 rounded-[50%] flex items-center justify-center bg-white">
                    <AiFillLike className="text-primaryRed text-lg" />
                  </div>
                  <p>Like</p>
                </button>
              )}
            </div>
          </div>
          <div className="w-[20rem] h-[30rem] absolute right-[15%] top-[10%]">
            <img
              className="h-full w-full object-cover"
              src={posterImg}
              alt=""
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto no-scrollbar px-8 ">
          <div className="flex items-center gap-12 w-[2000px] justify-between ">
            {crew.map((item) => {
              if (
                item.job === "Director" ||
                item.job === "Producer" ||
                item.job === "Writer" ||
                item.job === "Screenplay"
              ) {
                return (
                  <div key={item.credit_id} className="flex items-center gap-8">
                    <div className="w-12 h-12 rounded-[50%]">
                      <img
                        className="w-full h-full object-cover rounded-[50%]"
                        src={
                          item.profile_path
                            ? baseUrl + item.profile_path
                            : profile
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="font-bold text-primaryRed">{item.job}</p>
                      <p className="font-semibold">{item.original_name}</p>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieDetails;
