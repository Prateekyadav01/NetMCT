import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: {
        language: "en-US",
        page: 1,
    },
    mediaList: [],
    totalPages: 1,
};

const exploreSlice = createSlice({
    name: "explore",
    initialState: initialState,
    reducers: {
        resetValue: () => {
            return initialState;
        },
        setFilters: (state, action) => {
            state.filters = {...state.filters, [action.payload.type] : action.payload.value};
        },
        setPageNum : (state, action) => {
            state.pageNum = action.payload;
        },
        setMediaList : (state, action) => {
            if(action.payload.type === "old"){
                state.mediaList = [...state.mediaList, ...action.payload.data];
            }else{
                state.mediaList = action.payload.data;
            }
        },
        setTotalPage: (state, action) => {
            state.totalPages = action.payload;
        },
    }
});

export const { resetValue, setFilters, setMediaList, setTotalPage } = exploreSlice.actions;

export default exploreSlice.reducer;