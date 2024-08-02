import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { formDetails } from "../../Redux/authSlice";

const FrontForm = () => {
  const [checkEmpty, setCheckEmpty] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <h1 className="font-[900] text-5xl">
        Unlimited movies, TV shows and more
      </h1>
      <p className=" text-2xl">Watch anywhere. Cancel anytime.</p>
      <p className="text-xl">
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <div className="flex items-center gap-4 h-14">
        <div className="w-[25rem] emailContainer relative h-full">
          <input
            type="email"
            id="emailInput"
            className="w-full h-full bg-blackLayer px-4 border-gray-600 border-[1px] rounded-md"
            onChange={(e) => {
              setCheckEmpty(e.target.value);
              dispatch(
                formDetails({ type: "SIGNEMAIL", value: e.target.value })
              );
            }}
            required
          />
          <label
            htmlFor="emailInput"
            className={`emailInput absolute left-4 text-gray-400 transition-all duration-300 ease-in-out ${
              checkEmpty !== "" ? "top-0 text-[0.8rem]" : "top-4"
            }`}
          >
            Email address
          </label>
        </div>
        <Link className="h-full" to={"/signup"}>
          <button className="flex items-center bg-primaryRed h-full px-8 rounded-md gap-2 text-2xl font-medium">
            Get Started <FaAngleRight />{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FrontForm;
