import axios from "axios";

export const fetchData = async (url, params) => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3" + url, {
      params,
      headers: {
        Authorization: `Bearer  ${import.meta.env.VITE_BEARER_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};
