import { useEffect } from "react";
import {
  setGenre,
  setPopularMovies,
  setPopularTvShows,
  setTopMovies,
  setTopTvShows,
  setTrendingDay,
  setTrendingWeek,
} from "../Redux/homeSlice";
import { fetchData } from "./movieApi";
import { useDispatch } from "react-redux";

const useMedia = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const commonApiParams = {
      language: "en-US",
      page: 1,
    };
    const getTrendingDay = async () => {
      try {
        const data = await fetchData("/trending/all/day", commonApiParams);
        dispatch(setTrendingDay(data));
      } catch (err) {
        console.log(err);
      }
    };

    getTrendingDay();

    const getTrendingWeek = async () => {
      try {
        const data = await fetchData("/trending/all/week", commonApiParams);
        dispatch(setTrendingWeek(data));
      } catch (err) {
        console.log(err);
      }
    };

    getTrendingWeek();

    const getPopularMovies = async () => {
      try {
        const data = await fetchData("/movie/popular", commonApiParams);
        dispatch(setPopularMovies(data));
      } catch (error) {
        console.log(error);
      }
    };
    getPopularMovies();

    const getPopularTvShows = async () => {
      try {
        const data = await fetchData("/tv/popular", commonApiParams);
        dispatch(setPopularTvShows(data));
      } catch (error) {
        console.log(error);
      }
    };

    getPopularTvShows();

    const getTopMovies = async () => {
      try {
        const data = await fetchData("/movie/top_rated", commonApiParams);
        dispatch(setTopMovies(data));
      } catch (error) {
        console.log(error);
      }
    };
    getTopMovies();

    const getTopTvShows = async () => {
      try {
        const data = await fetchData("/tv/top_rated", commonApiParams);
        dispatch(setTopTvShows(data));
      } catch (error) {
        console.log(error);
      }
    };
    getTopTvShows();

    const fetchGenre = async () => {
      try {
        const data = await fetchData("/genre/movie/list", commonApiParams);
        dispatch(setGenre(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenre();
  }, [dispatch]);
};

export default useMedia;
