import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formDetails, notify, setFetching, setMessages } from "../../Redux/authSlice";
import { signUp } from "../../utils/userApi";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const Signup = () => {
  // const [emailEmpty, setEmailEmpty] = useState("");
  const [passEmpty, setPassEmpty] = useState("");
  const [nameEmpty, setNameEmpty] = useState("");
  const dispatch = useDispatch();
  const { signupEmail, signupName, signupPass, isFetching } = useSelector(
    (state) => state.auth
  );
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex flex-col">
        <h1 className="text-[2rem] font-semibold">
          Create a password to create <br /> your account
        </h1>
        <p className="text-[1.125rem]">
          Just a few more steps and you&apos;re finished!
        </p>
        <p className="text-[1.125rem]">We hate Paperwork, too.</p>
      </div>
      <form action="" className="w-full flex flex-col gap-4">
        <div className="w-full h-[3rem] emailContainer relative ">
          <input
            type="text"
            id="emailInput"
            className="w-full h-full bg-blackLayer px-4 border-gray-600 border-[1px] rounded-md"
            onChange={(e) => {
              setNameEmpty(e.target.value);
              dispatch(
                formDetails({ type: "SIGNNAME", value: e.target.value })
              );
            }}
            required
          />
          <label
            htmlFor="emailInput"
            className={`emailInput absolute left-4 text-gray-400 transition-all duration-300 ease-in-out ${
              nameEmpty !== "" ? "top-0 text-[0.8rem]" : "top-3"
            }`}
          >
            Name
          </label>
        </div>
        <div className="w-full emailContainer relative h-[3rem]">
          <input
            type="email"
            id="emailInput"
            defaultValue={signupEmail}
            className="w-full h-full bg-blackLayer px-4 border-gray-600 border-[1px] rounded-md"
            placeholder="Email"
            onChange={(e) => {
              // setEmailEmpty(e.target.value);
              dispatch(
                formDetails({ type: "SIGNEMAIL", value: e.target.value })
              );
            }}
            required
          />
          {/* <label
            htmlFor="emailInput"
            className={`emailInput absolute left-4 text-gray-400 transition-all duration-300 ease-in-out ${
              emailEmpty !== "" ? "top-0 text-[0.8rem]" : "top-3"
            }`}
          >
            Email address
          </label> */}
        </div>
        <div className="w-full h-[3rem] emailContainer relative ">
          <input
            type="password"
            id="emailInput"
            className="w-full h-full bg-blackLayer px-4 border-gray-600 border-[1px] rounded-md"
            onChange={(e) => {
              setPassEmpty(e.target.value);
              dispatch(
                formDetails({ type: "SIGNPASS", value: e.target.value })
              );
            }}
            required
          />
          <label
            htmlFor="emailInput"
            className={`emailInput absolute left-4 text-gray-400 transition-all duration-300 ease-in-out ${
              passEmpty !== "" ? "top-0 text-[0.8rem]" : "top-3"
            }`}
          >
            Password
          </label>
        </div>
        <button
          className="bg-primaryRed py-2 h-[3rem] rounded-md gap-2 text-2xl font-medium text-center flex items-center justify-center"
          onClick={async (e) => {
            e.preventDefault();
            dispatch(setFetching(true));
            const serverMessage = await signUp({
              username: signupName,
              email: signupEmail,
              password: signupPass,
            });
            dispatch(setMessages(serverMessage));
            setTimeout(() => {
              dispatch(setFetching(false));
            dispatch(notify(serverMessage));
            }, 1000);
          }}
        >
          {isFetching ? (
                <UseAnimations color={"white"} animation={loading} size={14} />
              ) : (
                "Sign up"
              )}
        </button>
      </form>

      <div className="flex items-center justify-center gap-2">
        <p>Already have an account? </p>
        <Link className="font-bold text-primaryRed" to={"/signin"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
