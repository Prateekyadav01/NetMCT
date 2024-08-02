import { useState } from "react";
import background from "../../assets/images/background.jpg";
import logo from "../../assets/svgs/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  formDetails,
  notify,
  setFetching,
  setIsAuthenticated,
  setMessages,
  setUser,
} from "../../Redux/authSlice";
import { authenticateUser, signIn } from "../../utils/userApi";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { useEffect } from "react";

const Login = () => {
  const [loginEmpty, setLoginEmpty] = useState("");
  const [logPassEmpty, setLogPassEmpty] = useState("");
  const dispatch = useDispatch();
  const { loginEmail, loginPass, isFetching } = useSelector(
    (state) => state.auth
  );
  const navigateTo = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const data = await authenticateUser();
      if (data.success === true) {
        dispatch(setUser(data.user));
        dispatch(setIsAuthenticated(true));
        navigateTo("/home");
      } else {
        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
      }
    };
    getUser();
  }, [dispatch]);
  return (
    <div
      className="w-full min-h-[100vh] h-full bg-no-repeat bg-cover flex flex-col items-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6 ), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6 ))`,
      }}
    >
      <div className="w-full min-h-[100vh] h-full absolute top-0 left-0 z-[-10] ">
        <img
          src={background}
          className="w-full h-full object-stretch "
          alt=""
        />
      </div>

      <div className="w-[80%] h-[5rem] px-4 flex items-center">
        <Link to={"/"}>
          <div className="w-[9rem]">
            <img src={logo} alt="" />
          </div>
        </Link>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-dimBlack min-w-[25rem] px-16 py-10 text-white flex flex-col gap-2">
          <h1 className="text-[2rem] font-bold">Sign In</h1>
          <form action="" className="w-[full] flex flex-col gap-4">
            <div className="w-full emailContainer relative h-[3rem]">
              <input
                type="email"
                id="emailInput"
                className="w-full h-full bg-blackLayer px-4 border-gray-600 border-[1px] rounded-md"
                onChange={(e) => {
                  setLoginEmpty(e.target.value);
                  dispatch(
                    formDetails({ type: "LOGINEMAIL", value: e.target.value })
                  );
                }}
                required
              />
              <label
                htmlFor="emailInput"
                className={`emailInput absolute left-4 text-gray-400 transition-all duration-300 ease-in-out ${
                  loginEmpty !== "" ? "top-0 text-[0.8rem]" : "top-3"
                }`}
              >
                Email address
              </label>
            </div>
            <div className="w-full h-[3rem] emailContainer relative ">
              <input
                type="password"
                id="emailInput"
                className="w-full h-full bg-blackLayer px-4 border-gray-600 border-[1px] rounded-md"
                onChange={(e) => {
                  setLogPassEmpty(e.target.value);
                  dispatch(
                    formDetails({ type: "LOGINPASS", value: e.target.value })
                  );
                }}
                required
              />
              <label
                htmlFor="emailInput"
                className={`emailInput absolute left-4 text-gray-400 transition-all duration-300 ease-in-out ${
                  logPassEmpty !== "" ? "top-0 text-[0.8rem]" : "top-3"
                }`}
              >
                Password
              </label>
            </div>
            <button
              className="bg-primaryRed h-[3rem] py-2 rounded-md gap-2 text-md font-medium text-center flex items-center justify-center"
              onClick={async (e) => {
                e.preventDefault();
                dispatch(setFetching(true));
                const response = await signIn({
                  email: loginEmail,
                  password: loginPass,
                });
                dispatch(setMessages(response));
                dispatch(setUser(response.user));
                setTimeout(() => {
                  dispatch(setFetching(false));
                  if (response.success) {
                    navigateTo("/home");
                  }
                  dispatch(notify(response));
                }, 1000);
              }}
            >
              {isFetching ? (
                <UseAnimations color={"white"} animation={loading} size={14} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="flex flex-col gap-2">
            <p className="cursor-pointer">Forgot Password?</p>
            <p>
              New to Netflix? <Link to={"/signup"} className="text-primaryRed font-bold">Sign up now.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
