import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utils/movieApi";
import {
  setSearchPage,
  setSearchList,
  setTotalSearchPages,
} from "../../Redux/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { DNA } from "react-loader-spinner";
import SearchCard from "./SearchCard";

const Search = () => {
  const { searchKeyword } = useParams();
  const dispatch = useDispatch();
  const { searchList, searchPage, totalSearchPages } = useSelector(
    (state) => state.home
  );

  const increasePageNum = () => {
    dispatch(setSearchPage(searchPage + 1));
  };

  useEffect(() => {
    dispatch(setSearchList([]));
    dispatch(setSearchPage(1));
  }, [searchKeyword]);

  useEffect(() => {
    const searchResults = async () => {
      try {
        const data = await fetchData(`/search/multi`, {
          language: "en-US",
          page: searchPage,
          query: searchKeyword,
        });
        dispatch(setSearchList(data.results));
        dispatch(setTotalSearchPages(data?.total_pages));
      } catch (error) {
        console.log(error);
      }
    };
    searchResults();
  }, [dispatch, searchKeyword, searchPage]);

  return (
    <div className="flex flex-col items-center pt-20 gap-8 w-full text-white">
      <div className="w-[90%]">
        <h1 className="text-xl font-semibold">
          Search results for `{searchKeyword}`
        </h1>
      </div>
      <div className=" w-[90%]">
        {searchList?.length !== 0 ? (
          <InfiniteScroll
            className="content flex flex-wrap gap-y-8 justify-around no-scrollbar"
            dataLength={searchList?.length || []}
            next={increasePageNum}
            hasMore={searchPage < totalSearchPages}
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
            {searchList?.map((item) => (
              <SearchCard key={item.id} endPoint={item.media_type} ele={item} />
            ))}
          </InfiniteScroll>
        ) : (
          <span className="resultNotFound">Sorry, Results not found!</span>
        )}
      </div>
    </div>
  );
};

export default Search;
