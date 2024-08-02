import "./Play.css";

const Play = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="80px"
      height="80px"
      viewBox="0 0 213.7 213.7"
      enableBackground="new 0 0 213.7 213.7"
      xmlSpace="preserve"
      className="w-full h-full"
    >
      <polygon
        className="triangle"
        fill="none"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        points="73.5,62.5 148.5,105.8 73.5,149.1 "
      />
      <circle
        className="circle"
        fill="none"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        cx="106.8"
        cy="106.8"
        r="103.3"
      />
    </svg>
  );
};

export default Play;
