import { useEffect } from "react";
import MovieDetails from "./MovieDetails";
import Recommendations from "./Recommendations";
import Similar from "./Similar";
import TopCast from "./TopCast";
import OfficialVideos from "./OfficialVideos";

const DetailsPage = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full text-white flex items-center flex-col gap-8 bg-black">
      <MovieDetails />
      <div className="w-[100%] flex flex-col items-center gap-8">
        <TopCast />
        <OfficialVideos />
        <Similar />
        <Recommendations />
      </div>
    </div>
  );
};

export default DetailsPage;
