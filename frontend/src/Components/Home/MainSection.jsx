import { useSelector } from "react-redux";
import Hero from "./Hero";
import SliderData from "../Sliders/SliderData";

const MainSection = () => {
  const { popularMovies, popularTvShows, topMovies, topTvShows, trendingDay } =
    useSelector((state) => state.home);

  return (
    <div className="flex flex-col w-full items-center">
      <Hero />
      <div className="dataSliders w-full flex flex-col items-center gap-16 bg-black z-[14]">
        <SliderData
          name="Trending Now Movies"
          data={trendingDay}
          endPoint={"movie"}
        />
        <SliderData
          name="Popular Movies"
          data={popularMovies}
          endPoint={"movie"}
        />
        <SliderData
          name="Popular TV Shows"
          data={popularTvShows}
          endPoint={"tv"}
        />
        <SliderData
          name="Top Rated Movies"
          data={topMovies}
          endPoint={"movie"}
        />
        <SliderData name="Top Rated Shows" data={topTvShows} endPoint={"tv"} />
      </div>
    </div>
  );
};

export default MainSection;
