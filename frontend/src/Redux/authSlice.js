import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  signupEmail: "",
  signupPass: "",
  signupName: "",
  loginEmail: "",
  loginPass: "",
  isAuthenticated: false,
  user: {},
  error: null,
  isFetching: false,
  isError: false,
  isSuccess: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    formDetails: (state, action) => {
      if (action.payload.type === "SIGNEMAIL") {
        state.signupEmail = action.payload.value;
      } else if (action.payload.type === "LOGINEMAIL") {
        state.loginEmail = action.payload.value;
      } else if (action.payload.type === "SIGNPASS") {
        state.signupPass = action.payload.value;
      } else if (action.payload.type === "LOGINPASS") {
        state.loginPass = action.payload.value;
      } else if (action.payload.type === "SIGNNAME") {
        state.signupName = action.payload.value;
      }
    },
    setMessages: (state, action) => {
      if (action.payload.success) {
        state.message = action.payload.message;
        state.isSuccess = action.payload.success;
        state.isError = !action.payload.success;
        state.error = "";
      } else {
        state.message = "";
        state.isError = !action.payload.success;
        state.error = action.payload.message;
        state.isSuccess = action.payload.success;
      }
    },
    notify: (state, action) => {
      if (action.payload.success) {
        toast(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  formDetails,
  setMessages,
  notify,
  setFetching,
  setUser,
  setIsAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;
