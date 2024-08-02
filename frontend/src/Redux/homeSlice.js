import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularMovies: [],
  popularTvShows: [],
  topMovies: [],
  topTvShows: [],
  trendingDay: [],
  trendingWeek: [],
  genre: [],
  searchList: [],
  searchPage: 1,
  totalSearchPages: 1,
  searchData: [],
  signOutBox: false,
  searchQuery: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload.results;
    },
    setPopularTvShows: (state, action) => {
      state.popularTvShows = action.payload.results;
    },
    setTopMovies: (state, action) => {
      state.topMovies = action.payload.results;
    },
    setTopTvShows: (state, action) => {
      state.topTvShows = action.payload.results;
    },
    setTrendingDay: (state, action) => {
      state.trendingDay = action.payload.results;
    },
    setTrendingWeek: (state, action) => {
      state.trendingWeek = action.payload.results;
    },
    setGenre: (state, action) => {
      state.genre = action.payload.genres;
    },
    setTotalSearchPages: (state, action) => {
      state.totalSearchPages = action.payload;
    },
    setSearchPage: (state, action) => {
      state.searchPage = action.payload;
    },
    setSearchList: (state, action) => {
      if (action.payload.length !== 0) {
        state.searchList = [...state.searchList, ...action.payload];
      } else {
        state.searchList = [];
      }
    },
    setSearchData: (state, action) => {
      state.searchData.push(action.payload);
    },
    setSignOutBox: (state, action) => {
      state.signOutBox = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setPopularMovies,
  setPopularTvShows,
  setTopMovies,
  setTopTvShows,
  setTrendingDay,
  setTrendingWeek,
  setGenre,
  setSearchPage,
  setTotalSearchPages,
  setSearchList,
  setSearchData,
  setSignOutBox,
  setSearchQuery,
} = homeSlice.actions;

export default homeSlice.reducer;
