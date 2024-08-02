import axios from "axios";

const baseUrl = "https://netflix-clone-5pqc.onrender.com/api/v1/user";
// const baseUrl = "http://localhost:10000/api/v1/user";

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, userData);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const signIn = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/signin`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const data = response.data;
    localStorage.setItem("netflixUser", JSON.stringify(data.user));
    return { ...response.data, user: data.user };
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
};

export const signOut = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/signout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const authenticateUser = async () => {
  try {
    const res = await axios.get(`${baseUrl}/authenticate`, {
      withCredentials: true,
    });
    const data = res.data;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const addToFavourites = async (id) => {
  try {
    const res = await axios.post(
      `${baseUrl}/likes/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data.updatedUser;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromFavourites = async (id) => {
  try {
    const res = await axios.post(
      `${baseUrl}/dislikes/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data.updatedUser;
  } catch (error) {
    console.log(error);
  }
};
