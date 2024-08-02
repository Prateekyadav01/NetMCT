import { Link, Outlet, useNavigate } from "react-router-dom";
import background from "../../assets/images/background.jpg";
import logo from "../../assets/svgs/Logo.svg";
import translate from "../../assets/svgs/translate.svg";
import { FaCaretDown } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../utils/userApi";
import { setIsAuthenticated, setUser } from "../../Redux/authSlice";

const FrontPage = () => {
  const [selectMenu, setSelectMenu] = useState(false);
  const [selectText, setSelectText] = useState("English");
  const dispatch = useDispatch();
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
      className="w-full h-[100vh] bg-no-repeat flex flex-col items-center"
      style={{
        backgroundSize: "125%",
        backgroundImage: `linear-gradient(black, rgba(0, 0, 0, 0.2), black), url(${background})`,
        backgroundPosition: "center 75% ",
      }}
    >
      <div className="w-[80%] h-[5rem] px-4 flex justify-between items-center">
        <Link to={"/"} className="w-[9rem]">
          <img src={logo} alt="" />
        </Link>
        <div className="flex items-center gap-8">
          <div
            className="relative text-white flex items-center gap-2 bg-transparent px-4 py-[0.1rem] rounded-sm cursor-pointer active:border-[1px] border-white"
            style={{ boxShadow: "0 0 1px 0px white" }}
            onClick={() => setSelectMenu((prev) => !prev)}
          >
            <img src={translate} alt="" />
            <p>{selectText}</p>
            <FaCaretDown />
            <div
              className={`flex-col items-center absolute top-[120%] left-0 w-full rounded-md bg-white text-black ${
                selectMenu ? "flex" : "hidden"
              }`}
            >
              <p
                className="hover:bg-[#1967D2] hover:text-white w-full text-center rounded-t-md"
                onClick={(e) => setSelectText(e.target.innerText)}
              >
                English
              </p>
              <p
                className="hover:bg-[#1967D2] hover:text-white w-full text-center rounded-b-md"
                onClick={(e) => setSelectText(e.target.innerText)}
              >
                हिन्दी
              </p>
            </div>
          </div>
          <div>
            <Link
              to={"/signin"}
              className="bg-primaryRed rounded-md py-1 px-4 text-white font-semibold active:scale-[0.99]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-full text-white flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default FrontPage;
