import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSimilar } from "../../Redux/detailsSlice";
import { fetchData } from "../../utils/movieApi";
import SliderData from "../Sliders/SliderData";

const Similar = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { similar } = useSelector((state) => state.media);

  useEffect(() => {
    const commonApiParams = {
      language: "en-US",
    };
    const url = `/${param.mediaType}/${param.id}`;
    const getSimilar = async () => {
      try {
        const data = await fetchData(url + "/similar", commonApiParams);
        dispatch(setSimilar(data));
      } catch (err) {
        console.log(err);
      }
    };

    getSimilar();
  }, [dispatch, param.id, param.mediaType]);
  return (
    similar.length !== 0 && <SliderData name="Similar" data={similar} endPoint={param.mediaType} />
  );
};

export default Similar;
