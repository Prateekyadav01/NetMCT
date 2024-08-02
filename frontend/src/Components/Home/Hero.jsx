import netflixSymbol from "../../assets/images/Netflix_Symbol.png";
import { IoIosPlay } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../utils/movieApi";
import { setHomeScreenData, setHomeScreenKey } from "../../Redux/detailsSlice";
import onePiece from "../../assets/onePiece.json";

const Hero = () => {
  const baseVideoUrl = "https://www.youtube.com/watch?v=";
  const { homeScreenKey, homeScreenData } = useSelector((state) => state.media);
  const dispatch = useDispatch();

  useEffect(() => {
    const commonApiParams = {
      language: "en-US",
      page: 1,
    };

    const getTrendingDay = async () => {
      try {
        const data = await fetchData("/trending/all/week", commonApiParams);
        const randomData =
          data && data.results[Math.floor(Math.random() * data.results.length)];
        try {
          const url = `/${randomData.media_type}/${randomData.id}/videos`;
          const videoData = await fetchData(url, commonApiParams);
          const video = videoData.results.filter((v) =>
            v.name.includes("Official")
          );
          if (video.length !== 0) {
            dispatch(setHomeScreenKey(video[0].key));

            const homeUrl = `/${randomData.media_type}/${randomData.id}`;
            const homeData = await fetchData(homeUrl, commonApiParams);
            dispatch(setHomeScreenData(homeData));
          } else {
            dispatch(setHomeScreenKey("fC5MKJDW6sc"));
            dispatch(setHomeScreenData(onePiece));
          }
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTrendingDay();
  }, [dispatch]);

  return (
    <div className="w-full h-full relative bg-no-repeat bg-cover text-white">
      {homeScreenData && Object.keys(homeScreenData).length !== 0 && (
        <div className="w-full min-h-[120vh] h-full relative bg-no-repeat bg-cover text-white">
          <div className="w-full h-full absolute z-[-1] top-0 left-0">
            <ReactPlayer
              url={baseVideoUrl + homeScreenKey}
              volume={0.1}
              width={"100%"}
              height={"100%"}
              playing
              loop
              muted
              config={{
                youtube: {
                  playerVars: { showinfo: 0 },
                },
              }}
            />
          </div>
          <div className="absolute top-[35%] left-[5%] flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div>
                <img src={netflixSymbol} alt="" />
              </div>
              <p className="text-xl font-semibold text-white">
                {homeScreenData.media_type === "tv" ? "SHOW" : "MOVIE"}
              </p>
            </div>
            <h1 className="text-[5rem] font-bold -mt-8">
              {homeScreenData.original_title ||
                homeScreenData.original_name ||
                homeScreenData.title ||
                homeScreenData.name}
            </h1>
            <div className="flex items-center gap-4">
              <button className="flex items-center bg-white gap-2 py-1 px-4 text-black font-semibold rounded-[0.25rem] hover:bg-whiteLayer hover:text-white transition-all duration-300 ease-in-out">
                {" "}
                <IoIosPlay /> Play
              </button>
              <button className="flex items-center bg-whiteLayer gap-2 py-1 px-4 font-semibold rounded-[0.25rem] hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                <IoIosInformationCircleOutline /> More info
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
