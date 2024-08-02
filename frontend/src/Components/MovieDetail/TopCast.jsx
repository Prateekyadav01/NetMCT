import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setTopCast } from "../../Redux/detailsSlice";
import { fetchData } from "../../utils/movieApi";
import profile from "../../assets/images/profile.png";

const TopCast = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { topCast } = useSelector((state) => state.media);
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const commonApiParams = {
    language: "en-US",
  };

  useEffect(() => {
    const url = `/movie/${param.id}`;
    const getTopCast = async () => {
      try {
        const data = await fetchData(url + "/credits", commonApiParams);
        dispatch(setTopCast(data));
      } catch (err) {
        console.log(err);
      }
    };

    getTopCast();
  }, [param.id]);
  return (
    <div className="w-[90%] flex flex-col gap-8 overflow-x-hidden">
      {topCast.length !== 0 && (
        <p className="text-2xl font-medium">Top Casts</p>
      )}
      <div className="w-full px-10 flex items-center gap-8 justify-start overflow-x-auto no-scrollbar">
        {topCast.map((cast) => {
          let profileImg = baseUrl + cast.profile_path;
          if (cast.profile_path === null) {
            profileImg = profile;
          }
          return (
            <div
              key={cast.id}
              id={cast.id}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-[12rem] h-[12rem] rounded-[50%]">
                <img
                  src={profileImg}
                  alt=""
                  className="rounded-[50%] object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col items-center">
                <p>{cast.original_name}</p>
                <p>{cast.character}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCast;
