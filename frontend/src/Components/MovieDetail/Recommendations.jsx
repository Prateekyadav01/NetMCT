import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setRecommendations } from "../../Redux/detailsSlice";
import { fetchData } from "../../utils/movieApi";
import SliderData from "../Sliders/SliderData";

const Recommendations = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { recommendation } = useSelector((state) => state.media);

  useEffect(() => {
    const url = `/${param.mediaType}/${param.id}`;
    const getRecommendations = async () => {
      try {
        const data = await fetchData(url + "/recommendations", {
          language: "en-US",
        });
        dispatch(setRecommendations(data));
      } catch (err) {
        console.log(err);
      }
    };

    getRecommendations();
  }, [param.id, param.mediaType, dispatch]);
  return recommendation.length !== 0 && <SliderData name="Recommendations" data={recommendation} endPoint={param.mediaType} />;
};

export default Recommendations;
