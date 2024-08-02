import { Link, useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import logo from "../../assets/svgs/Logo.svg";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from "../../assets/images/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSignOutBox } from "../../Redux/homeSlice";
import { signOut } from "../../utils/userApi";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { signOutBox, searchQuery } = useSelector((state) => state.home);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center justify-between py-4 w-full px-16 z-[1000] bg-dimNavbar backdrop-blur-[0.1rem] fixed top-0">
      <div className="flex items-center gap-8 justify-between">
        <Link to={"/home"} className="w-20">
          <img src={logo} className="object-cover" alt="" />
        </Link>
        <div className="flex items-center gap-4 text-white font-semibold">
          <Link to={"/home/explore/movie"}>Movies</Link>
          <Link to={"/home/explore/tv"}>Shows</Link>
        </div>
      </div>
      <div className="flex items-center gap-3 text-white">
        <input
          type="text"
          className="w-[25rem] py-2 text-white bg-transparent border-2 border-white outline-none rounded-lg pl-4"
          placeholder="Search Movies & Tv Shows...."
          onChange={(e) => {
            dispatch(setSearchQuery(e.target.value));
          }}
        />
        <LuSearch
          className="text-xl font-bold cursor-pointer"
          onClick={() => {
            if (searchQuery !== "") {
              navigateTo(`/home/search/${searchQuery}`);
            }
          }}
        />
        <IoMdNotificationsOutline className="text-xl font-bold cursor-pointer" />
        <div className="w-6 h-6 rounded-[50%] bg-blackLayer cursor-pointer relative">
          <img
            className="w-full h-full rounded-[50%]"
            src={profile}
            alt=""
            onClick={() => {
              dispatch(setSignOutBox(!signOutBox));
            }}
          />
          <div
            className={`absolute right-0 ${
              signOutBox ? "top-10" : "top-[-50rem]"
            } transition-all duration-300 ease-in-out rounded-lg w-32  bg-white text-black `}
          >
            <p className="text-lg font-semibold rounded-t-lg py-2 px-4 hover:bg-primaryRed hover:text-white">
              {user?.username}
            </p>
            <p
              className="text-lg font-semibold rounded-b-lg py-2 px-4 hover:bg-primaryRed hover:text-white"
              onClick={() => {
                signOut();
                dispatch(setSignOutBox(false));
                navigateTo("/signin");
              }}
            >
              Sign Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
