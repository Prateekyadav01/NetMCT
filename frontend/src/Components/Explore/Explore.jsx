import { useEffect, useCallback, useMemo } from "react";
import Select from "react-select";
import { fetchData } from "../../utils/movieApi";
import { useDispatch, useSelector } from "react-redux";
import { setGenre } from "../../Redux/homeSlice";
import {
  resetValue,
  setFilters,
  setMediaList,
  setTotalPage,
} from "../../Redux/exploreSlice";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { DNA } from "react-loader-spinner";
import SearchCard from "../Search/SearchCard";

const Explore = () => {
  const dispatch = useDispatch();
  const { mediaType } = useParams();

  const { genre } = useSelector((state) => state.home);
  const { mediaList, filters, totalPages } = useSelector(
    (state) => state.explore
  );

  const genreOptions = genre.map((item) => {
    return { value: item.id, label: item.name };
  });

  const sortData = useMemo(() => [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "primary_release_date.desc", label: "Release Date Descending" },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ], []);

  const handleGenre = useCallback((selectedOptions) => {
    const genre = selectedOptions.reduce((acc, item, idx, arr) => {
      if (idx !== arr.length - 1) {
        return acc + item.value + ",";
      }
      return acc + item.value;
    }, "");
    dispatch(setMediaList({ type: "new", data: [] }));
    dispatch(setFilters({ type: "with_genres", value: genre }));
  }, [dispatch]);

  const handleSort = useCallback(
    (selectedOption) => {
      dispatch(setMediaList({ type: "new", data: [] }));
      dispatch(setFilters({ type: "sort_by", value: selectedOption.value }));
    },
    [dispatch]
  );
  const increasePageNum = () => {
    dispatch(setFilters({ type: "page", value: filters.page + 1 }));
  };

  useEffect(() => {
    dispatch(resetValue());
    handleGenre([]);
    handleSort(sortData[0]);

    const commonApiParams = {
      language: "en-US",
      page: 1,
    };
    const fetchGenre = async () => {
      try {
        const data = await fetchData("/genre/movie/list", commonApiParams);
        dispatch(setGenre(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenre();
  }, [mediaType, dispatch, handleGenre, handleSort, sortData]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const data = await fetchData(`/discover/${mediaType}`, filters);
        dispatch(setTotalPage(data?.total_pages));
        dispatch(setMediaList({ type: "old", data: data.results }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMedia();
  }, [dispatch, filters, mediaType]);
  return (
    genre && (
      <div className="w-full flex flex-col pt-[3rem] bg-black text-white items-center">
        <div className="flex items-center justify-between py-8 w-[90%]">
          <h1 className="text-white w-[20%] font-bold">
            Explore {mediaType === "movie" ? "Movies" : "Tv Shows"}{" "}
          </h1>
          <div className="w-[80%] flex items-center justify-end gap-8 text-black">
            <Select
              isMulti
              name="genres"
              placeholder="Select a genre..."
              options={genreOptions}
              isSearchable={true}
              isClearable={true}
              className="basic-multi-select max-w-[100%] w-[25%] rounded-full bg-lightBackground"
              classNamePrefix="innerSelect select"
              onChange={handleGenre}
            />
            <Select
              name="sortBy"
              placeholder="Sort by..."
              options={sortData}
              isClearable={true}
              className="basic-multi-select max-w-[100%] w-[45%] rounded-full bg-lightBackground"
              classNamePrefix="innerSelect select"
              onChange={handleSort}
            />
          </div>
        </div>
        {/* <div className="w-[70%] flex flex-wrap gap-y-8">
          {mediaList.length !== 0 &&
            mediaList.map((media) => {
              return <MovieCard ele={media} key={media.id} />;
            })}
        </div> */}
        <div className=" w-[90%] ">
          {mediaList?.length !== 0 ? (
            <InfiniteScroll
              className="content flex flex-wrap gap-y-8 justify-around no-scrollbar"
              dataLength={mediaList?.length || []}
              next={increasePageNum}
              hasMore={filters.page < totalPages}
              loader={
                <DNA
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              }
            >
              {mediaList?.map((item) => {
                return (
                  <SearchCard key={item.id} endPoint={mediaType} ele={item} />
                );
              })}
            </InfiniteScroll>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </div>
      </div>
    )
  );
};

export default Explore;
