import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setVideos,
  setPlayerVideo,
  setIsModalOpen,
} from "../../Redux/detailsSlice";
import { fetchData } from "../../utils/movieApi";
import ReactPlayer from "react-player/lazy";
import Play from "../../assets/svgs/Play";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OfficialVideos = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { videos, playerVideo, isModalOpen } = useSelector(
    (state) => state.media
  );
  const baseVideoUrl = "https://www.youtube.com/watch?v=";
  useEffect(() => {
    const commonApiParams = {
      language: "en-US",
    };
    const url = `/${param.mediaType}/${param.id}`;
    const getVideos = async () => {
      try {
        const data = await fetchData(url + "/videos", commonApiParams);
        dispatch(setVideos(data));
      } catch (err) {
        console.log(err);
      }
    };

    getVideos();
  }, [param.id, dispatch, param.mediaType]);


  return (
    videos.length !== 0 && (
      <div className="w-[90%] flex flex-col gap-8 ">
        <p className="text-2xl font-medium">Official Videos</p>
        {/*  */}

        <div
          className={`w-[100%] h-[100%] fixed top-0 left-0 z-[30] ${
            isModalOpen ? "flex" : "hidden"
          } items-center justify-center modal bg-black pointer-events-auto transition-all duration-300 ease-in-out`}
          onClick={() => dispatch(setIsModalOpen(false))}
        >
          <div className="flex items-center w-[70%] h-[80%] ">
            <ReactPlayer
              url={playerVideo}
              playing={isModalOpen}
              config={{
                youtube: {
                  playerVars: { showinfo: 0 },
                },
              }}
              controls
              width={"100%"}
              height={"100%"}
              volume={0.1}
            />
          </div>
        </div>
        <div className="w-full px-10 h-[12.5rem] flex justify-start gap-4 overflow-x-scroll no-scrollbar">
          {videos.map((video) => {
            return (
              <div
                key={video.id}
                id={video.id}
                className="videoCard svgHover commonClass relative flex items-center justify-center rounded-[1rem] cursor-pointer group"
              >
                <div
                  className="hiddenBackground w-[20rem] h-[11.5rem] rounded-[1rem] top-3 absolute bg-lightBackground z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                  onClick={() => {
                    dispatch(setPlayerVideo(`${baseVideoUrl + video.key}`));
                    dispatch(setIsModalOpen(true));
                  }}
                ></div>
                <div className="relative commonClass w-[20rem] h-[11rem] z-10 rounded-[1rem]">
                  {/* <img
                  className="w-full h-full object-contain commonClass rounded-[1rem]"
                  src={
                    "https://img.youtube.com/vi/" + video.key + "/mqdefault.jpg"
                  }
                  alt=""
                /> */}
                  <LazyLoadImage
                    className="w-full h-full object-contain commonClass rounded-[1rem]"
                    src={
                      "https://img.youtube.com/vi/" +
                      video.key +
                      "/mqdefault.jpg"
                    }
                    effect="blur"
                    alt=""
                  />
                  <div className="absolute w-12 commonClass top-[35%] left-[40%]">
                    <Play />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default OfficialVideos;
